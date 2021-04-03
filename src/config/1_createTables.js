const db = require('./db');

async function createTables() {
  await db.connect();

  await db.query(`
  CREATE TABLE "recipes" (
    "id" SERIAL PRIMARY KEY,
    "title" text NOT NULL,
    "ingredients" text[] NOT NULL,
    "preparation" text[] NOT NULL,
    "information" text NOT NULL,
    "created_at" timestamp DEFAULT 'now()',
    "updated_at" timestamp DEFAULT 'now()',
    "chef_id" int NOT NULL
  );

  CREATE TABLE "chefs" (
    "id" SERIAL PRIMARY KEY,
    "file_id" int NOT NULL,
    "name" text NOT NULL,
    "created_at" timestamp DEFAULT 'now()',
    "updated_at" timestamp DEFAULT 'now()'
  );

  CREATE TABLE "files" (
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL,
    "path" text NOT NULL
  );

  CREATE TABLE "recipe_files" (
    "id" SERIAL PRIMARY KEY,
    "recipe_id" int NOT NULL,
    "file_id" int NOT NULL
  );

  ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");
  ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");
  ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");
  ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");
`);

  await db.end();
  console.log('Tables were created!');
}

createTables();
