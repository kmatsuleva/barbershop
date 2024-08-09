import { Outlet } from "react-router-dom";
import {
  CLIENT_DASHBOARD_NAVIGATION,
  ADMIN_DASHBOARD_NAVIGATION,
} from "../../constants/constants";
import styles from "./Dashboard.module.css";
import Sidebar from "../sidebar/Sidebar";
import { useUsers } from "../../hooks/useUsers";

export default function Dashboard() {
  const { userRole } = useUsers();

  console.log('userRole:', userRole);
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
        <section className="section-sm">
          <div className="shell">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
}
