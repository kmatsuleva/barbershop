import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../service/firebase";

const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.error("Error signing out: ", error);
      }
    })();
  }, []);

  return <Navigate to="/" />;
};

export default Logout;
