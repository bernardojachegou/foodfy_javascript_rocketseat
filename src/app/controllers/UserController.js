module.exports = {
  registerForm(request, response) {
    return response.render('user/register');
  },
  create(request, response) {
    return response.render('restricted/user/create');
  },
};
