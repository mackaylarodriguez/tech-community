/**
 * Application entry point.
 *
 * Bootstraps the Express server, loads environment variables, applies global
 * middleware (CORS, JSON parsing), mounts route modules, and starts listening
 * for incoming HTTP requests.
 */
const pool = require("./db/db");
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const resourceRoutes = require('./routes/resources');

const app = express();
const PORT = process.env.PORT || 3000;

// Global middleware
app.use(cors());
app.use(express.json());

// Health / welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Tech Community API 🚀' });
});

// API route modules (CRUD handlers will be added to resources.js later)
app.use('/api/resources', resourceRoutes);

// Quick check: is the database connected? (helps debug deployment)
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(PORT, async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL");
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
