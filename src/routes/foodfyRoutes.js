const foodfy = require('../app/controllers/foodfy');

module.exports = (routes) => {
  routes.get('/', foodfy.index);
  routes.get('/sobre', foodfy.about);
  routes.get('/receitas', foodfy.recipes);
  routes.get('/receitas/:id', foodfy.recipe);
  routes.get('/chefs', foodfy.chefs);
  routes.get('/chefs/:id', foodfy.chef);
};
