"use client";

/**
 * HomeContent — connects the form and the list on the home page.
 *
 * editingResource = null → Add mode
 * editingResource = { ... } → Edit mode (form pre-filled)
 */

import { useState } from "react";
import { deleteResource } from "@/lib/api";
import { useAuth } from "./AuthProvider";
import AddResourceForm from "./AddResourceForm";
import ResourceList from "./ResourceList";

export default function HomeContent() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

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
      {!showForm && user && (
        <div className="page-actions">
          <button className="btn btn-primary" onClick={openAddForm}>
            + Add Opportunity
          </button>
        </div>
      )}

      {!showForm && !user && (
        <p className="text-secondary page-actions">
          Log in to add, edit, or delete opportunities.
        </p>
      )}

      {showForm && (
        <AddResourceForm
          key={editingResource?.id ?? "new"}
          resource={editingResource}
          onSuccess={handleSuccess}
          onCancel={closeForm}
        />
      )}

      <ResourceList
        refreshKey={refreshKey}
        user={user}
        onEdit={openEditForm}
        onDelete={handleDelete}
      />
    </>
  );
}
