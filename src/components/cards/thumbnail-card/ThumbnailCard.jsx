import { Link } from "react-router-dom";

export default function ThumbnailCard({
  image,
  header,
  body,
  footer,
  detailsUrl,
}) {
  return (
    <div className="thumbnail-card">
      <img
        className="thumbnail-card-image"
        src={image}
        alt=""
        width="370"
        height="310"
      />
      <div className="thumbnail-card-body">
        {detailsUrl ? (
          <Link to={detailsUrl}>
            <p className="thumbnail-card-header">{header}</p>
          </Link>
        ) : (
          <p className="thumbnail-card-header">{header}</p>
        )}

        <div className="thumbnail-card-text">
          <p>{body}</p>
        </div>
        <p
          style={{
            color: "black",
            fontWeight: 500,
          }}
        >
          {footer}
        </p>
      </div>
    </div>
  );
}
