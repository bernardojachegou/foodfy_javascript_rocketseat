const Recipe = require('../models/Recipe');
const Chef = require('../models/Chef');

module.exports = {
  getAbout(request, response) {
    return response.render('foodfy/readAbout');
  },

  async index(request, response) {
    const { filter } = request.query;

    if (filter) {
      let results = await Recipe.findBy(filter);
      const recipes = results.rows;

      return response.render('foodfy/index', { recipes });
    } else {
      let results = await Recipe.all();
      const recipes = results.rows;

      return response.render('foodfy/index', { recipes });
    }
  },

  async getRecipes(request, response) {
    const { filter } = request.query;

    if (filter) {
      let results = await Recipe.findBy(filter);
      const recipes = results.rows;

      return response.render('foodfy/showRecipes', { recipes });
    } else {
      let results = await Recipe.all();
      const recipes = results.rows;

      return response.render('foodfy/showRecipes', { recipes });
    }
  },

  async getRecipeDetails(request, response) {
    let results = await Recipe.find(request.params.id);
    const recipe = results.rows[0];

    if (!recipe) return response.send('Recipe not found!');

    return response.render('foodfy/readRecipe', { recipe });
  },

  async getChefs(request, response) {
    let results = await Chef.all();
    const chefs = results.rows;

    return response.render('foodfy/showChefs', { chefs });
  },

  async getChefDetails(request, response) {
    let results = await Chef.find(request.params.id);
    const chef = results.rows[0];

    if (!chef) return response.send('Recipe not found!');

    results = await Chef.findRecipes(request.params.id);
    const recipes = results.rows[0];

    return response.render('foodfy/readChef', { chef, recipes });
  },
};
