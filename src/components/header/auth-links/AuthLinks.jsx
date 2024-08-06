import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

import {
  AUTHENTICATED_NAVIGATION,
  UNAUTHENTICATED_NAVIGATION,
} from "../../../constants/constants";

import styles from "../Header.module.css";

export default function AuthLinks({ onLinkClick }) {
  const { isAuthenticated } = useContext(AuthContext);

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
