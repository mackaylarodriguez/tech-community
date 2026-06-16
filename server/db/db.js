const { Pool } = require("pg");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set");
}

// Log host/user on startup (not password) — helps debug Render deploys
try {
  const { hostname, username } = new URL(process.env.DATABASE_URL);
  console.log(`DB target: ${username}@${hostname}`);
} catch {
  console.error("DATABASE_URL is not a valid URL");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;