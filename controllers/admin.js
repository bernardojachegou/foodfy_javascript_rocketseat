const data = require("../data.json");

exports.index = (request, response) => {
    return response.render("admin/recipes-adm", { recipes: data.recipes });
}

exports.recipesDetails = (request, response) => {

    const { id } = request.params;

    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id;
    })

    if (!foundRecipe) return response.send("Receita não encontrada");

    const recipe = foundRecipe;

    return response.render("admin/recipeDetails-adm", { recipe })
}