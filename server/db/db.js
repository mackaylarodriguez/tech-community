const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Required for Supabase when connecting from Render (external host)
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;