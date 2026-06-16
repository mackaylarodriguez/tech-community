"use client";

/**
 * AddResourceForm — create OR edit an opportunity.
 *
 * - No `resource` prop → Add mode (POST)
 * - With `resource` prop → Edit mode (PUT), form pre-filled
 */

import { useState } from "react";
import { createResource, updateResource } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";

const emptyForm = {
  title: "",
  organization: "",
  description: "",
  category: "",
  tech_area: "",
  url: "",
};

function toFormData(resource) {
  return {
    title: resource.title,
    organization: resource.organization,
    description: resource.description,
    category: resource.category,
    tech_area: resource.tech_area,
    url: resource.url,
  };
}

export default function AddResourceForm({ resource, onSuccess, onCancel }) {
  const isEditing = Boolean(resource);

  const [form, setForm] = useState(() =>
    isEditing ? toFormData(resource) : emptyForm
  );
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (isEditing) {
        await updateResource(resource.id, form);
      } else {
        await createResource(form);
        setForm(emptyForm);
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form card" onSubmit={handleSubmit}>
      <h3>{isEditing ? "Edit Opportunity" : "Add Opportunity"}</h3>

      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          className="form-input"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="organization">
          Organization
        </label>
        <input
          className="form-input"
          id="organization"
          name="organization"
          value={form.organization}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <textarea
          className="form-input"
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="category">
          Category
        </label>
        <select
          className="form-input"
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="tech_area">
          Tech Area
        </label>
        <input
          className="form-input"
          id="tech_area"
          name="tech_area"
          placeholder="e.g. Frontend, Python, Cloud"
          value={form.tech_area}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="url">
          URL
        </label>
        <input
          className="form-input"
          id="url"
          name="url"
          type="url"
          placeholder="https://"
          value={form.url}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="btn-group">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Add Opportunity"}
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
