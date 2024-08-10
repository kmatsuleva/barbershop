import { Link } from "react-router-dom";
import styles from "./ThumbnailCard.module.css";

export default function ThumbnailCard({
  image,
  header,
  body,
  footer,
  detailsUrl,
  color,
}) {
  return (
    <div
      className={`${styles["thumbnail-card"]} ${
        color ? styles[`thumbnail-card-${color}`] : ""
      }`}
    >
      <img
        className={styles["thumbnail-card-image"]}
        src={image}
        alt=""
        width="370"
        height="310"
      />
      <div className={styles["thumbnail-card-body"]}>
        {detailsUrl ? (
          <Link to={detailsUrl}>
            <p className={styles["thumbnail-card-header"]}>{header}</p>
          </Link>
        ) : (
          <p className={styles["thumbnail-card-header"]}>{header}</p>
        )}
        {body && (
          <div className={styles["thumbnail-card-text"]}>
            <p>{body}</p>
          </div>
        )}
        {footer && (
          <div className={styles["thumbnail-card-footer"]}>{footer}</div>
        )}
      </div>
    </div>
  );
}
