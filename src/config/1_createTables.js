const db = require('./db');

async function createTables() {
  await db.connect();

  await db.query(`
  CREATE TABLE IF NOT EXISTS "recipes" (
    "id" SERIAL PRIMARY KEY,
    "title" text,
    "ingredients" text[] NOT NULL,
    "preparation" text[] NOT NULL,
    "information" text,
    "created_at" timestamp,
    "chef_id" int NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "chefs" (
    "id" SERIAL PRIMARY KEY,
    "file_id" int,
    "name" text NOT NULL,
    "created_at" timestamp
  );
  
  CREATE TABLE IF NOT EXISTS "files" (
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL,
    "path" text NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "recipe_files" (
    "id" SERIAL PRIMARY KEY,
    "recipe_id" int,
    "file_id" int
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
