module.exports = {
  loginForm(request, response) {
    return response.render('session/login');
  },
  forgotForm(request, response) {
    return response.render('session/forgot-password');
  },
  resetForm(request, response) {
    return response.render('session/password-reset');
  },
};
