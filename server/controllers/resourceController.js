const pool = require("../db/db");

// GET /api/resources
const getResources = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM resources ORDER BY created_at DESC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve resources",
    });
  }
};

// POST /api/resources
const createResource = async (req, res) => {
  const { title, organization, description, category, tech_area, url } =
    req.body;

  try {
    const result = await pool.query(
      `INSERT INTO resources (title, organization, description, category, tech_area, url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, organization, description, category, tech_area, url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create resource",
    });
  }
};

module.exports = {
  getResources,
  createResource,
};