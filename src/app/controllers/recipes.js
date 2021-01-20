const Recipe = require('../models/recipe');
const File = require('../models/File');
const RecipeFile = require('../models/RecipeFile');

module.exports = {
  async index(request, response) {
    let results = await Recipe.all();
    const recipes = results.rows;

    return response.render('admin/recipes/index', { recipes });
  },

  async show(request, response) {
    let results = await Recipe.find(request.params.id);
    const recipe = results.rows[0];

    if (!recipe) return response.send('Recipe not found!');

    return response.render('admin/recipes/read', { recipe });
  },

  async create(request, response) {
    let results = await Recipe.chefsList();
    const chefsList = results.rows;
    return response.render('admin/recipes/create', { chefsList });
  },

  async edit(request, response) {
    let results = await Recipe.find(request.params.id);
    const recipe = results.rows[0];

    if (!recipe) return response.send('Recipe not found!');

    results = await Recipe.chefsList();
    const chefsList = results.rows;

    return response.render('admin/recipes/edit', { recipe, chefsList });
  },

  async post(request, response) {
    try {
      const keys = Object.keys(request.body);

      //Check empty fields;
      for (key of keys) {
        if (request.body[key] == '') {
          return response.send('Por favor, preencha todos os campos!');
        }
      }

      // Check images quantity;
      if (request.files.length == 0) {
        return response.send('Por favor, envie pelo menos uma imagem');
      }

      // Create recipes (db input);
      const recipeResults = await Recipe.create(request.body);
      const recipe = recipeResults.rows[0];

      //Create files (db input);
      const filesResults = await Promise.all(
        request.files.map((file) => File.create(file))
      );
      const files = filesResults.map((result) => result.rows[0]);

      //Create recipe_file (db input);
      files.map((file) =>
        RecipeFile.create({ recipe_id: recipe.id, file_id: file.id })
      );

      const recipeId = recipe.id;
      return response.redirect(`/receitas/${recipeId}`);
    } catch (error) {
      console.log(error);
    }
  },

  async put(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] == '') {
        return response.send('Please, fill all the fields!');
      }
    }

    let results = await Recipe.update(request.body);
    const recipeId = results.rows[0].id;

    return response.redirect(`/admin/receitas/${recipeId}`);
  },

  async delete(request, response) {
    await Recipe.delete(request.body.id);

    return response.redirect('/admin/receitas');
  },
};
