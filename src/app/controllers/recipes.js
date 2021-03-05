const Recipe = require('../models/recipe');
const File = require('../models/File');
const RecipeFile = require('../models/RecipeFile');

module.exports = {
  async index(request, response) {
    try {
      let recipeResults = await Recipe.all();
      const recipes = recipeResults.rows;

      // if (!recipes) return response.send('Recipes not found!')

      async function getImage(recipe_id) {
        const fileResults = await RecipeFile.findRecipeId(recipe_id);
        const fileId = fileResults.rows[0].file_id;
        const imageResults = await File.find(fileId);
        const image = imageResults.rows.map(
          (image) =>
            `${request.protocol}://${request.headers.host}${image.path.replace(
              'public',
              ''
            )}`
        );

        return image[0];
      }
      const recipesPromise = recipes.map(async (recipe) => {
        recipe.image = await getImage(recipe.id);
        return recipe;
      });

      const lastAdded = await Promise.all(recipesPromise);
      return response.render('admin/recipes/index', { recipes: lastAdded });
    } catch (error) {
      console.log(error);
    }
  },

  async show(request, response) {
    try {
      const recipeResults = await Recipe.find(request.params.id);
      const recipe = recipeResults.rows[0];

      if (!recipe) return response.send('Recipe not found!');

      const results = await RecipeFile.findRecipeId(request.params.id);
      const recipeFilesPromise = await Promise.all(
        results.rows.map((file) => File.find(file.file_id))
      );

      let recipeFiles = recipeFilesPromise.map((result) => result.rows[0]);
      recipeFiles = recipeFiles.map((file) => ({
        ...file,
        src: `${request.protocol}://${request.headers.host}${file.path.replace(
          'public',
          ''
        )}`,
      }));
      return response.render('admin/recipes/read', { recipe, recipeFiles });
    } catch (error) {
      console.log(error);
    }
  },

  async create(request, response) {
    try {
      let results = await Recipe.chefsList();
      const chefsList = results.rows;

      return response.render('admin/recipes/create', { chefsList });
    } catch (error) {
      console.log(error);
    }
  },

  async edit(request, response) {
    try {
      let results = await Recipe.find(request.params.id);
      const recipe = results.rows[0];

      if (!recipe) return response.send('Recipe not found!');

      results = await Recipe.chefsList();
      const chefsList = results.rows;

      results = await RecipeFile.files(request.params.id);

      let files = results.rows;
      files = files.map((file) => ({
        ...file,
        src: `${request.protocol}://${request.headers.host}${file.path.replace(
          'public',
          ''
        )}`,
      }));

      return response.render('admin/recipes/edit', {
        recipe,
        files,
        chefsList,
      });
    } catch (error) {
      console.log(error);
    }
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

      return response.redirect(`receitas/${recipeId}`);
    } catch (error) {
      console.log(error);
    }
  },

  async put(request, response) {
    try {
      const keys = Object.keys(request.body);

      for (key of keys) {
        if (request.body[key] == '' && key != 'removed_files') {
          return response.send('Please fill all fields!');
        }
      }

      let newFiles;

      if (request.files.length != 0) {
        newFiles = await Promise.all(
          request.files.map((file) => File.create(file))
        );
        // console.log(newFiles);

        const files = newFiles.map((result) => result.rows[0]);
        files.map((file) =>
          RecipeFile.create({ recipe_id: request.body.id, file_id: file.id })
        );
        // console.log(files);
      }

      // remove photo from db
      if (request.body.removed_files) {
        // 1,2,3,
        const removedFiles = request.body.removed_files.split(','); // [1,2,3,]

        const lastIndex = removedFiles.length - 1;

        removedFiles.splice(lastIndex, 1); // [1,2,3]

        const removeRecipeFilePromise = removedFiles.map((id) =>
          RecipeFile.deleteFileId(id)
        );

        await Promise.all(removeRecipeFilePromise);

        const removedFilesPromise = removedFiles.map((id) => File.delete(id));
        await Promise.all(removedFilesPromise);
      }

      await Recipe.update(request.body);

      return response.redirect(`/admin/receitas/${request.body.id}`);
    } catch (error) {
      console.log(error);
    }
  },

  async delete(request, response) {
    try {
      const recipeFiles = await RecipeFile.findRecipeId(request.body.id);

      await Promise.all(
        recipeFiles.rows.map((recipeFile) => {
          RecipeFile.delete(recipeFile.id);
        })
      );

      await Promise.all(
        recipeFiles.rows.map(async (recipeFile) => {
          await Recipe.delete(recipeFile.recipe_id);
          await File.delete(recipeFile.file_id);
        })
      );

      return response.redirect('/admin/receitas');
    } catch (error) {
      console.log(error);
    }
  },
};
