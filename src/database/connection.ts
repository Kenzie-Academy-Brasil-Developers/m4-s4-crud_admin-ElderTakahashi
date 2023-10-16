import client from "./config";

const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Database started.");
  createTables();
};

export default startDatabase;

export const createTables = async () => {
  try {
    const resetQuery = `        
        DROP TABLE IF EXISTS "users" CASCADE;
        DROP TABLE IF EXISTS "courses" CASCADE;
        DROP TABLE IF EXISTS "userCourses" CASCADE;
      `;
    await client.query(resetQuery);

    const createTableQuery = `
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(50) NOT NULL,
        "email" VARCHAR(50) NOT NULL UNIQUE,
        "password" VARCHAR(120) NOT NULL,
        "admin" BOOLEAN NOT NULL DEFAULT false
      );
    
      CREATE TABLE "courses" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(15) NOT NULL,
        "description" TEXT NOT NULL
      );
    
      CREATE TABLE "userCourses" (
        "id" SERIAL PRIMARY KEY,
        "active" BOOLEAN NOT NULL DEFAULT true,
        "userId" INTEGER NOT NULL,
        "courseId" INTEGER NOT NULL,
        FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE,
        FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE CASCADE
      );  
      `;
    await client.query(createTableQuery);
    console.log("Tables are ready to work");
  } catch (error) {
    console.log(error);
  }
};
