const Recipe = require('../models/recipe');

module.exports = {
    index(request, response) {
        Recipe.all(function (recipes) {
            return response.render("admin/recipes/index", { recipes })
        })

    },

    create(request, response) {
        return response.render("admin/recipes/create");
    },

    show(request, response) {
        Recipe.find(request.params.id, function (recipe) {
            if (!recipe) return response.send("Recipe not found!")
        })

        return response.render("admin/recipes/read", { recipe })
    },

    edit(request, response) {
        Recipe.find(request.params.id, function (recipe) {
            if (!recipe) return response.send("Recipe not found!")

            Recipe.instructorsSelectOptions(function (options) {
                return response.render("admin/recipes/edit", {});
            })

        })


        const { id } = request.params;

        const foundRecipe = data.recipes.find(function (recipe) {
            return recipe.id == id;
        })

        if (!foundRecipe) return response.send("Receita não encontrada");


        return response.render("admin/recipes/edit", { recipe: foundRecipe });
    },

    post(request, response) {

        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!");
            }
        }

        Recipe.create(request.body, function (recipe) {
            return response.redirect(`/receitas/${recipe.id}`)
        })
    },

    put(request, response) {
        const keys = Object.keys(request.body);

        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!")
            }
        }

        Recipe.update(request.body, function () {
            return response.redirect(`/admin/receitas/${request.body.id}`)
        })
    },

    delete(request, response) {
        Recipe.delete(request.body.id, function () {
            return response.redirect("/admin/receitas")
        })
    }
}

