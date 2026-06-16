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

module.exports = {
  getResources,
};