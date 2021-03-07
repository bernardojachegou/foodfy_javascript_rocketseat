const File = require('../models/File');
const Recipe = require('../models/Recipe');
const RecipeFile = require('../models/RecipeFile');
const Chef = require('../models/Chef');

module.exports = {
  about(request, response) {
    return response.render('foodfy/about');
  },

  async index(request, response) {
    try {
      const { filter } = request.query;

      if (filter) {
        let filterResults = await Recipe.findBy(filter);
        const recipes = filterResults.rows;

        async function getImage(recipe_id) {
          const fileResults = await RecipeFile.findRecipeId(recipe_id);
          const fileId = fileResults.rows[0].file_id;
          const imageResults = await File.find(fileId);
          const image = imageResults.rows.map(
            (image) =>
              `${request.protocol}://${
                request.headers.host
              }${image.path.replace('public', '')}`
          );

          return image[0];
        }
        const recipesPromise = recipes.map(async (recipe) => {
          recipe.image = await getImage(recipe.id);
          return recipe;
        });

        const lastAdded = await Promise.all(recipesPromise);

        return response.render('foodfy/home', { recipes: lastAdded });
      } else {
        let recipeResults = await Recipe.all();
        const recipes = recipeResults.rows;

        async function getImage(recipe_id) {
          const fileResults = await RecipeFile.findRecipeId(recipe_id);
          const fileId = fileResults.rows[0].file_id;
          const imageResults = await File.find(fileId);
          const image = imageResults.rows.map(
            (image) =>
              `${request.protocol}://${
                request.headers.host
              }${image.path.replace('public', '')}`
          );

          return image[0];
        }
        const recipesPromise = recipes.map(async (recipe) => {
          recipe.image = await getImage(recipe.id);
          return recipe;
        });

        const lastAdded = await Promise.all(recipesPromise);
        return response.render('foodfy/home', { recipes: lastAdded });
      }
    } catch (error) {
      console.error(error);
    }
  },

  async recipes(request, response) {
    try {
      const { filter } = request.query;

      if (filter) {
        let filterResults = await Recipe.findBy(filter);
        const recipes = filterResults.rows;

        async function getImage(recipe_id) {
          const fileResults = await RecipeFile.findRecipeId(recipe_id);
          const fileId = fileResults.rows[0].file_id;
          const imageResults = await File.find(fileId);
          const image = imageResults.rows.map(
            (image) =>
              `${request.protocol}://${
                request.headers.host
              }${image.path.replace('public', '')}`
          );

          return image[0];
        }
        const recipesPromise = recipes.map(async (recipe) => {
          recipe.image = await getImage(recipe.id);
          return recipe;
        });

        const lastAdded = await Promise.all(recipesPromise);

        return response.render('foodfy/recipes', { recipes: lastAdded });
      } else {
        let recipeResults = await Recipe.all();
        const recipes = recipeResults.rows;

        async function getImage(recipe_id) {
          const fileResults = await RecipeFile.findRecipeId(recipe_id);
          const fileId = fileResults.rows[0].file_id;
          const imageResults = await File.find(fileId);
          const image = imageResults.rows.map(
            (image) =>
              `${request.protocol}://${
                request.headers.host
              }${image.path.replace('public', '')}`
          );

          return image[0];
        }
        const recipesPromise = recipes.map(async (recipe) => {
          recipe.image = await getImage(recipe.id);
          return recipe;
        });

        const lastAdded = await Promise.all(recipesPromise);
        return response.render('foodfy/recipes', { recipes: lastAdded });
      }
    } catch (error) {
      console.error(error);
    }
  },

  async recipe(request, response) {
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
      return response.render('foodfy/recipe', { recipe, recipeFiles });
    } catch (error) {
      console.log(error);
    }
  },

  async chefs(request, response) {
    try {
      let results = await Chef.all();
      const chefs = results.rows;

      const chefWithImage = await Promise.all(
        chefs.map(async (chef) => {
          const fileResults = await Chef.find(chef.id);
          const fileId = fileResults.rows[0].file_id;

          const imageResults = await File.find(fileId);
          const image = imageResults.rows[0].path;

          return {
            ...chef,
            image: `${request.protocol}://${
              request.headers.host
            }${image.replace('public', '')}`,
          };
        })
      );
      return response.render('foodfy/chefs', { chefs: chefWithImage });
    } catch (error) {
      console.log(error);
    }
  },

  async chef(request, response) {
    try {
      let results = await Chef.find(request.params.id);

      const chef = results.rows[0];

      if (!chef) return response.send('Chef not found!');

      results = await File.find(chef.file_id);
      const files = results.rows.map((file) => ({
        ...file,
        src: `${request.protocol}://${request.headers.host}${file.path.replace(
          'public',
          ''
        )}`,
      }));

      results = await Chef.findChefRecipes(chef.id);
      const chefRecipes = results.rows;

      const chefRecipesWithImage = await Promise.all(
        chefRecipes.map(async (recipe) => {
          const fileResults = await RecipeFile.findRecipeId(recipe.id);
          const fileId = fileResults.rows[0].file_id;

          const imageResults = await File.find(fileId);
          const image = imageResults.rows[0].path;

          return {
            ...recipe,
            image: `${request.protocol}://${
              request.headers.host
            }${image.replace('public', '')}`,
          };
        })
      );

      return response.render('foodfy/chef', {
        chef,
        files,
        chefRecipes: chefRecipesWithImage,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
