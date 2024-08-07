import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "../../hooks/useForm";
import { auth } from "../../service/firebase";
import Button from "../button/Button";
import styles from "./Login.module.css";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { values, handleInputChange } = useForm(initialValues);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleFormValidation = () => {
    const errorsList = {};

    if (!values.email) {
      errorsList.email = "Email is required.";
    } else if (!validateEmail(values.email)) {
      errorsList.email = "Invalid email address.";
    }
    if (!values.password) errorsList.password = "Password is required.";

    setErrors(errorsList);
    return Object.keys(errorsList).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (handleFormValidation()) {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate("/");
      } catch (error) {
        console.error("Login error:", error.message);
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
                        <fieldset
                          className={`${styles["form-group"]} ${
                            errors.email ? styles["has-error"] : ""
                          }`}
                        >
                          <input
                            type="email"
                            name="email"
                            placeholder="Email *"
                            className={styles["form-control"]}
                            value={values.email}
                            onChange={handleInputChange}
                          />
                          {errors.email && (
                            <span className={styles["form-validation"]}>
                              {errors.email}
                            </span>
                          )}
                        </fieldset>
                      </div>
                      <div className="cell-md-6 mt-1">
                        <fieldset
                          className={`${styles["form-group"]} ${
                            errors.password ? styles["has-error"] : ""
                          }`}
                        >
                          <input
                            type="password"
                            name="password"
                            placeholder="Password *"
                            className={styles["form-control"]}
                            value={values.password}
                            onChange={handleInputChange}
                          />
                          {errors.password && (
                            <span className={styles["form-validation"]}>
                              {errors.password}
                            </span>
                          )}
                        </fieldset>
                      </div>
                    </div>

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
