const pool = require("../db/db");

async function getResourceForAuth(id) {
  const result = await pool.query(
    "SELECT id, user_id FROM resources WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

function canModifyResource(resource, userId) {
  // Legacy resources (no owner) — any logged-in user can edit/delete
  if (resource.user_id === null) {
    return true;
  }
  return resource.user_id === userId;
}

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

  const { title, organization, description, category, tech_area, url, location } =
    req.body;

  try {
    const result = await pool.query(
      `INSERT INTO resources (title, organization, description, category, tech_area, url, location, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, organization, description, category, tech_area, url, location, req.userId]
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
  const { title, organization, description, category, tech_area, url, location } =
    req.body;

  try {
    const existing = await getResourceForAuth(id);

    if (!existing) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (!canModifyResource(existing, req.userId)) {
      return res.status(403).json({
        message: "Not authorized to modify this resource",
      });
    }

    const result = await pool.query(
      `UPDATE resources
       SET title = $1, organization = $2, description = $3,
           category = $4, tech_area = $5, url = $6, location = $7, updated_at = now()
       WHERE id = $8
       RETURNING *`,
      [title, organization, description, category, tech_area, url, location, id]
    );

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
    const existing = await getResourceForAuth(id);

    if (!existing) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (!canModifyResource(existing, req.userId)) {
      return res.status(403).json({
        message: "Not authorized to modify this resource",
      });
    }

    await pool.query("DELETE FROM resources WHERE id = $1", [id]);

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