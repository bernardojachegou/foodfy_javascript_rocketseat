const SessionController = require('../../app/controllers/SessionController');
const UserController = require('../../app/controllers/UserController');

module.exports = (routes) => {
  routes.get('/login', SessionController.loginForm);
  routes.get('/forgot-password', SessionController.forgotForm);
  routes.get('/password-reset', SessionController.resetForm);
  routes.get('/register', UserController.registerForm);
};

// routes.post('/login', SessionValidator.login, SessionController.login);
// routes.post('/logout', SessionController.logout);

// routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot);
// routes.post('/password-reset', SessionValidator.reset, SessionController.reset);

// routes.post('/register', UserValidator.post, UserController.post);

// // Rotas de perfil de um usuário logado
// routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
// routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado

// // Rotas que o administrador irá acessar para gerenciar usuários
// routes.get('/admin/users', UserController.list) // Mostrar a lista de usuários cadastrados
// routes.post('/admin/users', UserController.post) // Cadastrar um usuário
// routes.get('/admin/users/create', UserController.create) // Mostrar o formulário de criação de um usuário
// routes.put('/admin/users/:id', UserController.put) // Editar um usuário
// routes.get('/admin/users/:id/edit', UserController.edit) // Mostrar o formulário de edição de um usuário
// routes.delete('/admin/users/:id', UserController.delete) // Deletar um usuário
