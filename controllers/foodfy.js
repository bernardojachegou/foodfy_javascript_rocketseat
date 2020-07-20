const recipes = require("../data");

exports.index = (request, response) => {
    return response.render("index", { recipes });
}

exports.about = (request, response) => {
    return response.render("about");
}

exports.recipesTable = (request, response) => {
    return response.render("recipes", { recipes });
}

exports.recipesDetails = (request, response) => {
    const id = request.params.index;

    const recipe = recipes.find(function (recipe) {
        return recipe.index == id;
    })

    if (!recipe) {
        return response.send("Receita não encontrada");
    }
    return response.render("recipeDetails", { recipe })
}