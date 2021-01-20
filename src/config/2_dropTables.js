const db = require('./db');

async function dropTables() {
  db.connect();

  db.query(`DROP TABLE IF EXISTS recipes, chefs, files, recipe_files CASCADE`);

  db.end();

  console.log('Tables were deleted!');
}

dropTables();
