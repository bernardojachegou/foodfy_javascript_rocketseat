const recipes = require('../../app/controllers/RecipesController');
const multer = require('../../app/middlewares/multer');

module.exports = (routes) => {
  routes.get('/admin/recipes', recipes.index);
  routes.get('/admin/recipes/create', recipes.create);
  routes.get('/admin/recipes/:id', recipes.show);
  routes.get('/admin/recipes/:id/edit', recipes.edit);
  routes.post('/admin/recipes', multer.array('recipe_photos', 5), recipes.post);
  routes.put('/admin/recipes', multer.array('recipe_photos', 5), recipes.put);
  routes.delete('/admin/recipes', recipes.delete);
};
