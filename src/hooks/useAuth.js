import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../service/firebase";
import { doc, setDoc } from "firebase/firestore";

export const useAuth = () => useContext(AuthContext);

export const useLogin = () => {
  const [loginError, setLoginError] = useState("");
  const { handleUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      handleUser({ uid: user });
      localStorage.setItem("user", user.uid);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);

      switch (error.code) {
        case "auth/invalid-credential":
          setLoginError("User not found. Please check your email or register.");
          break;
        default:
          setLoginError("Login failed. Please try again.");
      }
    }
  };

  return { login, loginError };
};

export const useRegister = () => {
  const [registerError, setRegisterError] = useState("");
  const { handleUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const register = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        role: "client",
      });

      handleUser({
        uid: user.uid,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        role: "client",
      });

      localStorage.setItem("user", user.uid);
      navigate("/");
    } catch (error) {
      console.log(error.message);

      switch (error.code) {
        case "auth/email-already-in-use":
          setRegisterError(
            "This email address is already in use. Please use a different email or try logging in."
          );
          break;
        default:
          setRegisterError("Register failed. Please try again.");
      }
    }
  };

  return { register, registerError };
};

export const useLogout = () => {
  const [logoutError, setLogoutError] = useState(null);
  const { handleUser } = useContext(AuthContext);

  const logout = async () => {
    try {
      await auth.signOut();
      handleUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error signing out: ", error);
      setLogoutError(error);
    }
  };

  return { logout, logoutError };
};
