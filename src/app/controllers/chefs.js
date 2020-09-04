const Chef = require('../models/chef');

module.exports = {
    index(request, response) {
        Chef.all(function (chefs) {
            return response.render("admin/chefs/index", { chefs })
        })
    }
}