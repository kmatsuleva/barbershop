import { Link } from "react-router-dom";

export default function ButtonLink({
  url,
  text,
  size,
  className,
  btnStyle
}) {
  return (
    <Link
      className={`btn ${size ? `btn-${size}` : ""} ${
        btnStyle ? `btn-${btnStyle}` : "btn-style-1"
      } btn-primary ${className ? className : ""}`}
      to={url}
    >
      {text}
    </Link>
  );
}
