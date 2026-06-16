"use client";

import { useEffect, useState } from "react";
import { getResources } from "@/lib/api";
import { canModifyResource } from "@/lib/auth";
import ResourceCard from "./ResourceCard";
import ResourceModal from "./ResourceModal";

export default function ResourceList({
  refreshKey = 0,
  category = "",
  user,
  onEdit,
  onDelete,
}) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    async function loadResources() {
      try {
        setError(null);
        const data = await getResources();
        setResources(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadResources();
  }, [refreshKey]);

  const filtered = category
    ? resources.filter((r) => r.category === category)
    : resources;

  if (loading) {
    return <p className="text-secondary">Loading opportunities...</p>;
  }

  if (error) {
    return <p className="error-text">Error: {error}</p>;
  }

  if (resources.length === 0) {
    return <p className="text-secondary">No opportunities yet. Add one above!</p>;
  }

  return (
    <>
      {filtered.length === 0 ? (
        <p className="text-secondary">No resources in this category.</p>
      ) : (
        <div className="card-grid">
          {filtered.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              canModify={canModifyResource(resource, user)}
              onOpen={() => setSelectedResource(resource)}
              onEdit={() => onEdit(resource)}
              onDelete={() => onDelete(resource)}
            />
          ))}
        </div>
      )}

      {selectedResource && (
        <ResourceModal
          resource={selectedResource}
          canModify={canModifyResource(selectedResource, user)}
          onClose={() => setSelectedResource(null)}
          onEdit={() => {
            setSelectedResource(null);
            onEdit(selectedResource);
          }}
          onDelete={async () => {
            await onDelete(selectedResource);
            setSelectedResource(null);
          }}
        />
      )}
    </>
  );
}
