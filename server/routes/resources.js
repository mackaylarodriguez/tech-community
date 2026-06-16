/**
 * Resource routes module.
 *
 * Will define REST API endpoints for CRUD operations on application resources.
 * Each route will delegate request handling to the appropriate controller and
 * return JSON responses to the client.
 *
 */

const express = require("express");
const router = express.Router();

const {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} = require("../controllers/resourceController");
const authMiddleware = require("../middleware/authMiddleware");

// GET all resources — public
router.get("/", getResources);

// POST / PUT / DELETE — require login
router.post("/", authMiddleware, createResource);
router.put("/:id", authMiddleware, updateResource);
router.delete("/:id", authMiddleware, deleteResource);

module.exports = router;

// GET    /api/resources      — list all resources
// GET    /api/resources/:id  — get one resource by id
// POST   /api/resources      — create a new resource
// PUT    /api/resources/:id  — update a resource
// DELETE /api/resources/:id  — delete a resource

