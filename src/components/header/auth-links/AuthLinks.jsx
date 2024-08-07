import { Link } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import {
  AUTHENTICATED_NAVIGATION,
  UNAUTHENTICATED_NAVIGATION,
} from "../../../constants/constants";

import styles from "../Header.module.css";

export default function AuthLinks({ onLinkClick }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return;
  }

  return (
    <>
      {(isAuthenticated
        ? AUTHENTICATED_NAVIGATION
        : UNAUTHENTICATED_NAVIGATION
      ).map((item) => (
        <li key={item.url} className={styles["nav-item"]}>
          <Link to={item.url} onClick={onLinkClick}>
            {item.title}
          </Link>
        </li>
      ))}
    </>
  );
}
