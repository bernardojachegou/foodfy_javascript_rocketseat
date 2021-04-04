const chefsController = require('../../app/controllers/ChefsController');
const multer = require('../../app/middlewares/multer');

module.exports = (routes) => {
  routes.get('/admin/chefs', chefsController.index);
  routes.get('/admin/chefs/create', chefsController.create);
  routes.get('/admin/chefs/:id', chefsController.show);
  routes.get('/admin/chefs/:id/edit', chefsController.edit);
  routes.post('/admin/chefs', multer.array('chef_avatar', 1), chefsController.post);
  routes.put('/admin/chefs', multer.array('chef_avatar', 1), chefsController.put);
  routes.delete('/admin/chefs', chefsController.delete);
};
