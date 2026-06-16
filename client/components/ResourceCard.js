/**
 * ResourceCard — displays ONE resource.
 * Click the card body to open full details in a modal.
 */
export default function ResourceCard({
  resource,
  canModify,
  onOpen,
  onEdit,
  onDelete,
}) {
  function stopClick(e) {
    e.stopPropagation();
  }

  return (
    <article className="card card-clickable" onClick={onOpen}>
      <div className="card-body">
        <h3>{resource.title}</h3>
        <p className="card-org">{resource.organization}</p>
        {resource.location && (
          <p className="card-location text-secondary">{resource.location}</p>
        )}
        <p className="card-description text-secondary">{resource.description}</p>

        <div className="card-tags">
          <span className="tag">{resource.category}</span>
        </div>
      </div>

      <div className="card-footer">
        <span className="card-hint text-secondary">Tap for details</span>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
          onClick={stopClick}
        >
          Visit resource →
        </a>

        {canModify && (
          <div className="btn-group card-actions" onClick={stopClick}>
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
