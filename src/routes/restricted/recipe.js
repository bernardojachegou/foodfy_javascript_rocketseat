const RecipesController = require('../../app/controllers/RecipesController');
const multer = require('../../app/middlewares/multer');

module.exports = (routes) => {
  routes.get('/admin/recipes', RecipesController.index);
  routes.get('/admin/recipes/create', RecipesController.create);
  routes.get('/admin/recipes/:id', RecipesController.show);
  routes.get('/admin/recipes/:id/edit', RecipesController.edit);
  routes.post('/admin/recipes', multer.array('recipe_photos', 5), RecipesController.post);
  routes.put('/admin/recipes', multer.array('recipe_photos', 5), RecipesController.put);
  routes.delete('/admin/recipes', RecipesController.delete);
};
