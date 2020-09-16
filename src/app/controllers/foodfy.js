const Recipe = require('../models/Recipe');
const Chef = require('../models/Chef');

module.exports = {
    index(request, response) {
        const { filter } = request.query;

        if (filter) {
            Recipe.findBy(filter, function (recipes) {
                return response.render("foodfy/index", { recipes })
            })
        } else {
            Recipe.all(function (recipes) {
                return response.render("foodfy/index", { recipes })
            })
        }
    },

    getAbout(request, response) {
        return response.render("foodfy/readAbout");
    },

    getRecipes(request, response) {
        const { filter } = request.query;

        if (filter) {
            Recipe.findBy(filter, function (recipes) {
                return response.render("foodfy/showRecipes", { recipes })
            })
        } else {
            Recipe.all(function (recipes) {
                return response.render("foodfy/showRecipes", { recipes })
            })
        }
    },

    getRecipeDetails(request, response) {
        Recipe.find(request.params.id, function (recipe) {
            if (!recipe) return response.send("Recipe not found!")

            return response.render("foodfy/readRecipe", { recipe })
        })
    },

    getChefs(request, response) {
        Chef.all(function (chefs) {
            return response.render("foodfy/showChefs", { chefs })
        })
    },

    getChefDetails(request, response) {
        Chef.find(request.params.id, function (chef) {
            if (!chef) return response.send("Recipe not found!")

            Chef.findRecipes(request.params.id, function (recipes) {

                return response.render("foodfy/readChef", { chef, recipes })
            })

        })
    }
}

