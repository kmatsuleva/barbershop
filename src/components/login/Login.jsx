import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "../../hooks/useForm";
import { auth } from "../../service/firebase";
import Button from "../button/Button";
import styles from "./Login.module.css";
import { useState } from "react";
import FormField from "../form-field/FormField";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validators = {
    email: (value) =>
      !value
        ? "Email is required."
        : !/\S+@\S+\.\S+/.test(value)
        ? "Invalid email address."
        : null,
    password: (value) => (!value ? "Password is required." : null),
  };

  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const { values, handleInputChange, handleFormValidation, errors } = useForm(
    initialValues,
    validators
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    if (handleFormValidation()) {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate("/");
      } catch (error) {
        console.error("Login error:", error.message);

        switch (error.code) {
          case "auth/invalid-credential":
            setLoginError(
              "User not found. Please check your email or register."
            );
            break;
          default:
            setLoginError("Login failed. Please try again.");
        }
      }
    }
  };

  return (
    <section className="section-xl">
      <div className="range range-50">
        <div className="cell-xs-12">
          <form onSubmit={handleLogin}>
            <div className="shell">
              <div className="range">
                <div className="cell-md-5 d-none d-lg-flex">
                  <img
                    src="/images/home-three-3-1011x800.jpg"
                    className="w-full h-full"
                    style={{ objectFit: "cover" }}
                    alt="Background"
                  />
                </div>
                <div className="cell-md-7 mt-0">
                  <div className="flex flex-col h-full justify-center text-center">
                    <h4>Welcome Back!</h4>
                    <p className="mb-3">
                      Log in to book your next appointment, manage your favorite
                      barbers, and explore our latest blog posts. Share your
                      experience by writing testimonials and stay connected with
                      our community.
                    </p>

                    <div className="range mt-0">
                      <div className="cell-md-6 mt-1">
                        <FormField
                          type="email"
                          name="email"
                          placeholder="Email *"
                          value={values.email}
                          onChange={handleInputChange}
                          error={errors.email}
                        />
                      </div>
                      <div className="cell-md-6 mt-1">
                        <FormField
                          type="password"
                          name="password"
                          placeholder="Password *"
                          value={values.password}
                          onChange={handleInputChange}
                          error={errors.password}
                        />
                      </div>
                    </div>

                    {loginError && (
                      <div className="range mt-3">
                        <div className="cell-md-11 m-auto">
                          <p className={styles["error-msg"]}>{loginError}</p>
                        </div>
                      </div>
                    )}

                    <div className="range">
                      <div className="cell-md-12">
                        <Button
                          type="submit"
                          text="Log In"
                          size="sm"
                          btnStyle="circle"
                          className="btn-block"
                        />
                      </div>
                    </div>

                    <div>
                      <Link
                        to="/register"
                        className={styles["create-account-link"]}
                      >
                        Create new account
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
