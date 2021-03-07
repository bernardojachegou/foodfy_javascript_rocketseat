const foodfy = require('../app/controllers/foodfy');

module.exports = (routes) => {
  routes.get('/', foodfy.index);
  routes.get('/sobre', foodfy.getAbout);
  routes.get('/receitas', foodfy.getRecipes);
  routes.get('/receitas/:id', foodfy.getRecipeDetails);
  routes.get('/chefs', foodfy.getChefs);
  routes.get('/chefs/:id', foodfy.getChefDetails);
};
