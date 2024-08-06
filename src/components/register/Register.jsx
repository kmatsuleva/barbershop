import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegister } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";

import Button from "../button/Button";

import styles from "./Register.module.css";

export default function Register() {
  // variables
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  // states
  const [errors, setErrors] = useState({});

  // hooks
  const register = useRegister();
  const navigate = useNavigate();
  const { values, handleInputChange } = useForm(initialValues);

  // handlers
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

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

  const handleFormSubmitClick = async (event) => {
    event.preventDefault();

    try {
      if (handleFormValidation()) {
        await register(values.email, values.password);
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <section className="section-xl">
        <div className="range range-50">
          <div className="cell-xs-12">
            <form onSubmit={handleFormSubmitClick}>
              <div className="shell">
                <div className="range">
                  <div className="cell-md-6">
                    <img
                      src="/images/home-three-3-1011x800.jpg"
                      className="w-full h-full"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="cell-md-6">
                    <div className="flex flex-col h-full justify-center text-center">
                      <h4>Welcome!</h4>
                      <p className="mb-3">
                        Register to book your next appointment, manage your
                        favorite barbers, and explore our latest blog posts.
                        Share your experience by writing testimonials and stay
                        connected with our community.
                      </p>
                      <div className="form-group">
                        <fieldset
                          className={`${styles["form-group"]} ${
                            errors.email ? styles["has-error"] : ""
                          }`}
                        >
                          <input
                            type="text"
                            name="name"
                            placeholder="Name *"
                            className="form-control"
                            value={values.name}
                            onChange={handleInputChange}
                          />
                        </fieldset>
                        {errors.name && (
                          <span className={styles["form-validation"]}>
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <fieldset
                          className={`${styles["form-group"]} ${
                            errors.email ? styles["has-error"] : ""
                          }`}
                        >
                          <input
                            type="email"
                            name="email"
                            placeholder="Email *"
                            className="form-control"
                            value={values.email}
                            onChange={handleInputChange}
                          />
                        </fieldset>
                        {errors.email && (
                          <span className={styles["form-validation"]}>
                            {errors.email}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <fieldset
                          className={`${styles["form-group"]} ${
                            errors.password ? styles["has-error"] : ""
                          }`}
                        >
                          <input
                            type="password"
                            name="password"
                            placeholder="Password *"
                            className="form-control"
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

                      <div className="range">
                        <div className="cell-md-12">
                          <Button type="submit" text="Register" size="sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
