/**
 * ResourceCard — displays ONE resource.
 *
 * onEdit is a callback — when Edit is clicked, the parent decides what to do.
 */
export default function ResourceCard({
  resource,
  canModify,
  onEdit,
  onDelete,
}) {
  return (
    <article className="card">
      <div className="card-body">
        <h3>{resource.title}</h3>
        <p className="card-org">{resource.organization}</p>
        <p className="card-description text-secondary">{resource.description}</p>

        <div className="card-tags">
          <span className="tag">{resource.category}</span>
          <span className="tag">{resource.tech_area}</span>
        </div>
      </div>

      <div className="card-footer">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          Visit resource →
        </a>

        {canModify && (
          <div className="btn-group card-actions">
            <button className="btn btn-primary" type="button" onClick={onEdit}>
              Edit
            </button>
            <button className="btn btn-danger" type="button" onClick={onDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
