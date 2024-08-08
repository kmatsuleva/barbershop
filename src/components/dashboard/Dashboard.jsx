import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  CLIENT_DASHBOARD_NAVIGATION,
  ADMIN_DASHBOARD_NAVIGATION,
} from "../../constants/constants";
import Sidebar from "./sidebar/Sidebar";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { userRole } = useAuth();

  return (
    <>
      <Sidebar
        navigation={
          userRole === "client"
            ? CLIENT_DASHBOARD_NAVIGATION
            : ADMIN_DASHBOARD_NAVIGATION
        }
      />

      <div className={styles["dashboard-body"]}>
        <section className="section-xl">
          <div className="shell">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
}
