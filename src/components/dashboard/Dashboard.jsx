import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  CLIENT_DASHBOARD_NAVIGATION,
  ADMIN_DASHBOARD_NAVIGATION,
} from "../../constants/constants";
import styles from "./Dashboard.module.css";
import Sidebar from "../sidebar/Sidebar";

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
        <section className="section-sm h-full pt-4">
          <div className="shell h-full">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
}
