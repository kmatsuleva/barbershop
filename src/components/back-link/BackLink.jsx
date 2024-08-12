import { Link } from "react-router-dom";

export default function BackLink({ onClick }) {
  return (
    <div className="shell">
      <Link className="link link-primary link-return mb-3" onClick={onClick}>
        Back
      </Link>
    </div>
  );
}
