const chefs = require('../../app/controllers/ChefsController');
const multer = require('../../app/middlewares/multer');

module.exports = (routes) => {
  routes.get('/admin/chefs', chefs.index);
  routes.get('/admin/chefs/create', chefs.create);
  routes.get('/admin/chefs/:id', chefs.show);
  routes.get('/admin/chefs/:id/edit', chefs.edit);
  routes.post('/admin/chefs', multer.array('chef_avatar', 1), chefs.post);
  routes.put('/admin/chefs', multer.array('chef_avatar', 1), chefs.put);
  routes.delete('/admin/chefs', chefs.delete);
};
