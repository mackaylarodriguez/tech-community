const { Pool } = require("pg");
require("dotenv").config();

const ssl = { rejectUnauthorized: false };

function createPool() {
  // Separate vars — paste password WITHOUT URL encoding (best for Render)
  if (process.env.DB_HOST) {
    console.log(`DB target: ${process.env.DB_USER}@${process.env.DB_HOST}`);
    return new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "postgres",
      ssl,
    });
  }

  // Single connection string — works locally
  if (process.env.DATABASE_URL) {
    const { hostname, username } = new URL(process.env.DATABASE_URL);
    console.log(`DB target: ${username}@${hostname}`);
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl,
    });
  }

  throw new Error("Database not configured");
}

const pool = createPool();

module.exports = pool;
