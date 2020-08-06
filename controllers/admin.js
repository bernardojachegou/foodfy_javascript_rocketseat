const data = require("../data.json");

exports.index = (request, response) => {
    return response.render("admin/indexRecipes-adm", { recipes: data.recipes });
}

exports.create = (request, response) => {
    return response.render("admin/createRecipe-adm");
}

exports.show = (request, response) => {

    const { id } = request.params;
    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id;
    })

    if (!foundRecipe) return response.send("Receita não encontrada");

    const recipe = foundRecipe;

    return response.render("admin/showDetails-adm", { recipe })
}

// exports.post = (request, response) => {

//     const keys = Object.keys(request.body);

//     for (key of keys) {
//         if (request.body[key] == "") {
//             return response.send("Please, fill all the fields!");
//         }
//     }

//     let id = 1;
//     const lastRecipe = data.recipes[data.recipes.length - 1];

//     if (lastRecipe) {
//         id = lastRecipe.id + 1;
//     }

//     data.recipes.push({
//         id,
//         ...request.body,
//     })

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
//         if (err) return response.send("Writing file error!")

//         return response.redirect(`/receitas/${id}`)
//     })

// }

