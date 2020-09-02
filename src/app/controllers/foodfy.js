const Recipe = require('../models/recipe');

module.exports = {
    index(request, response) {
        Recipe.all(function (recipes) {
            return response.render("foodfy/index", { recipes })
        })
    },

    get_about(request, response) {
        return response.render("foodfy/read_about");
    },

    get_recipes(request, response) {
        Recipe.all(function (recipes) {
            return response.render("foodfy/show_recipes", { recipes })
        })
    },

    get_details(request, response) {
        Recipe.find(request.params.id, function (recipe) {
            if (!recipe) return response.send("Recipe not found!")

            return response.render("foodfy/read_recipe", { recipe })
        })
    }
}

