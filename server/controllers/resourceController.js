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
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message:
        "Request body is empty.",
    });
  }

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

// PUT /api/resources/:id
const updateResource = async (req, res) => {
  const { id } = req.params;
  const { title, organization, description, category, tech_area, url } =
    req.body;

  try {
    const result = await pool.query(
      `UPDATE resources
       SET title = $1, organization = $2, description = $3,
           category = $4, tech_area = $5, url = $6, updated_at = now()
       WHERE id = $7
       RETURNING *`,
      [title, organization, description, category, tech_area, url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update resource" });
  }
};

// DELETE /api/resources/:id
const deleteResource = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM resources WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({ message: "Resource deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete resource" });
  }
};

module.exports = {
  getResources,
  createResource,
  updateResource,
  deleteResource,
};