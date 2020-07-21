const data = require("../data.json");

exports.index = (request, response) => {
    return response.render("foodfy/index", { recipes: data.recipes });
}

exports.about = (request, response) => {
    return response.render("foodfy/about");
}

exports.recipesTable = (request, response) => {
    return response.render("foodfy/recipes", { recipes: data.recipes });
}

exports.recipesDetails = (request, response) => {
    
    const { id } = request.params;

    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id;
    })

    if (!foundRecipe) return response.send("Receita não encontrada");
    
    const recipe = foundRecipe;

    return response.render("foodfy/recipeDetails", { recipe })
}