const Chef = require('../models/chef');

module.exports = {
    index(request, response) {
        Chef.all(function (chefs) {
            return response.render("admin/chefs/index", { chefs })
        })
    },

    create(request, response) {
        return response.render("admin/chefs/create")
    },

    post(request, response) {
        const keys = Object.keys(request.body);
        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!");
            }
        }

        Chef.create(request.body, function (chef) {
            return response.redirect(`/admin/chefs`)
        })
    }
}