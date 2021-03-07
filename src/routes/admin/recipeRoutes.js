const recipes = require('../../app/controllers/recipes');
const multer = require('../../app/middlewares/multer');

module.exports = (routes) => {
  routes.get('/admin/receitas', recipes.index);
  routes.get('/admin/receitas/criar', recipes.create);
  routes.get('/admin/receitas/:id', recipes.show);
  routes.get('/admin/receitas/:id/editar', recipes.edit);
  routes.post('/admin/receitas', multer.array('recipe_photos', 5), recipes.post);
  routes.put('/admin/receitas', multer.array('recipe_photos', 5), recipes.put);
  routes.delete('/admin/receitas', recipes.delete);
};


