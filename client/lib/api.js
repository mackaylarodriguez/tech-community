/**
 * API configuration for Tech Community.
 *
 * Every frontend request goes to our Express backend using fetch().
 * We never call Supabase directly from the browser.
 */

// NEXT_PUBLIC_ makes this value available in the browser (required by Next.js).
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetches all resources from the Express API.
 * Calls: GET /api/resources
 */
export async function getResources() {
  const response = await fetch(`${API_URL}/api/resources`);

  if (!response.ok) {
    throw new Error("Failed to fetch resources");
  }

  return response.json();
}

/**
 * Creates a new resource via the Express API.
 * Calls: POST /api/resources
 */
export async function createResource(data) {
  const response = await fetch(`${API_URL}/api/resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create resource");
  }

  return response.json();
}

/**
 * Updates an existing resource via the Express API.
 * Calls: PUT /api/resources/:id
 */
export async function updateResource(id, data) {
  const response = await fetch(`${API_URL}/api/resources/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update resource");
  }

  return response.json();
}

/** DELETE /api/resources/:id */
export async function deleteResource(id) {
  const response = await fetch(`${API_URL}/api/resources/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete resource");
  }
}
