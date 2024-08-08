import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar({ navigation }) {
  return (
    <aside className={`${styles["sidebar"]}`}>
      <ul className={styles["sidebar-list"]}>
        {navigation.map((page) => (
          <li key={page.url} className={styles["sidebar-item"]}>
            <NavLink
              to={page.url}
              className={({ isActive }) =>
                `${styles["sidebar-link"]} ${
                  isActive ? styles["sidebar-active-link"] : ""
                }`
              }
            >
              {page.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
