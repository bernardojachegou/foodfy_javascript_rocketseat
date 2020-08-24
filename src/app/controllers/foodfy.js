const data = require("../../data.json");

exports.index = (request, response) => {
    return response.render("foodfy/index", { recipes: data.recipes });
}

exports.get_about = (request, response) => {
    return response.render("foodfy/read_about");
}

exports.get_recipes = (request, response) => {
    return response.render("foodfy/show_recipes", { recipes: data.recipes });
}

exports.get_details = (request, response) => {

    const { id } = request.params;

    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id;
    })

    if (!foundRecipe) return response.send("Receita não encontrada");

    const recipe = foundRecipe;

    return response.render("foodfy/read_recipe", { recipe })
}