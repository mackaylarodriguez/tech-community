"use client";

/**
 * HomeContent — connects the form and the list on the home page.
 *
 * editingResource = null → Add mode
 * editingResource = { ... } → Edit mode (form pre-filled)
 */

import { useState } from "react";
import { deleteResource } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import { useAuth } from "./AuthProvider";
import AddResourceForm from "./AddResourceForm";
import FormModal from "./FormModal";
import ResourceList from "./ResourceList";

export default function HomeContent() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [category, setCategory] = useState("");

  function openAddForm() {
    setEditingResource(null);
    setShowForm(true);
  }

  function openEditForm(resource) {
    setEditingResource(resource);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingResource(null);
  }

  function handleSuccess() {
    closeForm();
    setRefreshKey((key) => key + 1);
  }

  async function handleDelete(resource) {
    if (!confirm(`Delete "${resource.title}"?`)) return;

    try {
      await deleteResource(resource.id);
      setRefreshKey((key) => key + 1);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <div className="page-toolbar">
        <div className="page-toolbar-intro">
          <h2>Browse Opportunities</h2>
        </div>

        <div className="page-toolbar-filter">
          <select
            id="category-filter"
            className="form-input"
            aria-label="Filter by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="page-toolbar-actions">
          {user ? (
            <button className="btn btn-primary" type="button" onClick={openAddForm}>
              + Add Opportunity
            </button>
          ) : (
            <p className="text-secondary toolbar-login-hint">
              Log in to add opportunities
            </p>
          )}
        </div>
      </div>

      {showForm && (
        <FormModal onClose={closeForm}>
          <AddResourceForm
            key={editingResource?.id ?? "new"}
            resource={editingResource}
            onSuccess={handleSuccess}
            onCancel={closeForm}
          />
        </FormModal>
      )}

      <ResourceList
        refreshKey={refreshKey}
        category={category}
        user={user}
        onEdit={openEditForm}
        onDelete={handleDelete}
      />
    </>
  );
}
