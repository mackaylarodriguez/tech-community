/**
 * API configuration for Tech Community.
 *
 * Every frontend request goes to our Express backend using fetch().
 * We never call Supabase directly from the browser.
 */

import { getAuthHeaders } from "./auth";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function parseError(response, fallback) {
  try {
    const data = await response.json();
    return data.message || fallback;
  } catch {
    return fallback;
  }
}

export async function getResources() {
  const response = await fetch(`${API_URL}/api/resources`);

  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to fetch resources"));
  }

  return response.json();
}

export async function register(email, password) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to register"));
  }

  return response.json();
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to log in"));
  }

  return response.json();
}

export async function getMe() {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to fetch user"));
  }

  return response.json();
}

export async function createResource(data) {
  const response = await fetch(`${API_URL}/api/resources`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to create resource"));
  }

  return response.json();
}

export async function updateResource(id, data) {
  const response = await fetch(`${API_URL}/api/resources/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to update resource"));
  }

  return response.json();
}

export async function deleteResource(id) {
  const response = await fetch(`${API_URL}/api/resources/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(await parseError(response, "Failed to delete resource"));
  }
}
