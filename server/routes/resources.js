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
} = require("../controllers/resourceController");

// GET all resources
router.get("/", getResources);

// POST a new resource
router.post("/", createResource);

module.exports = router;

// GET    /api/resources      — list all resources
// GET    /api/resources/:id  — get one resource by id
// POST   /api/resources      — create a new resource
// PUT    /api/resources/:id  — update a resource
// DELETE /api/resources/:id  — delete a resource

