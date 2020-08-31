const fs = require('fs');
const data = require('../../data.json');
const { date } = require('../../lib/utils');
const db = require('../../config/db');
const { callbackify } = require('util');

exports.index = (request, response) => {
    return response.render("admin/recipes/index", { recipes: data.recipes });
}

exports.create = (request, response) => {
    return response.render("admin/recipes/create");
}

exports.show = (request, response) => {

    const { id } = request.params;
    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id;
    })

    if (!foundRecipe) return response.send("Receita não encontrada");

    const recipe = foundRecipe;

    return response.render("admin/recipes/read", { recipe })
}

exports.edit = (request, response) => {

    const { id } = request.params;

    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id;
    })

    if (!foundRecipe) return response.send("Receita não encontrada");


    return response.render("admin/recipes/edit", { recipe: foundRecipe });
}

exports.post = (request, response) => {

    const keys = Object.keys(request.body);

    for (key of keys) {
        if (request.body[key] == "") {
            return response.send("Please, fill all the fields!");
        }
    }

    const query = `
        INSERT INTO recipes (
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `

    const values = [
        request.body.image,
        request.body.title,
        request.body.ingredients,
        request.body.preparation,
        request.body.information,
        date(Date.now()).iso

    ]

    // let id = 1;
    // const lastRecipe = data.recipes[data.recipes.length - 1];

    // if (lastRecipe) {
    //     id = lastRecipe.id + 1;
    // }

    // data.recipes.push({
    //     id,
    //     ...request.body,
    // })

    // fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    //     if (err) return response.send("Writing file error!")

    //     return response.redirect(`/receitas/${id}`)
    // })

    db.query(query, values, function (err, results) {
        if (err) throw `Database error: ${err}`

        return response.redirect(`/admin/receitas/${results.rows[0].id}`)
    });

}

exports.put = (request, response) => {
    const { id } = request.body;

    let index = 0;

    const foundRecipe = data.recipes.find(function (recipe, foundIndex) {
        if (id == recipe.id) {
            index = foundIndex
            return true;
        }
    })

    if (!foundRecipe) return response.send("Recipe not found!");

    const recipe = {
        ...foundRecipe,
        ...request.body,
        id: Number(request.body.id)
    }

    data.recipes[index] = recipe;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return response.send("Could not include on date.json!")

        return response.redirect(`/admin/receitas/${id}`);
    })
}

exports.delete = (request, response) => {
    const { id } = request.body;

    const filteredRecipes = data.recipes.filter(function (recipe) {
        return recipe.id != id;
    })

    data.recipes = filteredRecipes;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return response.send("Could not delete the selected recipe!");

        return response.redirect("/admin/receitas");
    })
}
