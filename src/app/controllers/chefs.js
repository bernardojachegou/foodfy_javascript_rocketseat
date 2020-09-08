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

    show(request, response) {
        Chef.find(request.params.id, function (chef) {
            if (!chef) return response.send("Chef not found!")

            return response.render("admin/chefs/read", { chef })
        })
    },

    edit(request, response) {
        Chef.find(request.params.id, function (chef) {
            if (!chef) return response.send("Chef not found!")

            return response.render("admin/chefs/edit", { chef })
        })
    },

    post(request, response) {
        const keys = Object.keys(request.body);
        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!");
            }
        }

        Chef.create(request.body, function (chef) {
            return response.redirect(`/admin/chefs/${chef.id}`)
        })
    },

    put(request, response) {
        const keys = Object.keys(request.body);
        for (key of keys) {
            if (request.body[key] == "") {
                return response.send("Please, fill all the fields!")
            }
        }

        Chef.update(request.body, function () {
            return response.redirect(`/admin/chefs/${request.body.id}`)
        })
    },

    delete(request, response) {
        Chef.delete(request.body.id, function () {
            return response.redirect("/admin/chefs")
        })
    }
}