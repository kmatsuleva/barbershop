import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm";

import Button from "../button/Button";

import styles from "./Register.module.css";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
} from "../../server/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default function Register() {
  // variables
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  // states
  const [errors, setErrors] = useState({});

  // hooks
  const navigate = useNavigate();
  const { values, handleInputChange } = useForm(initialValues);

  // handlers
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleFormValidation = () => {
    const errorsList = {};

    if (!values.firstName) errorsList.firstName = "Field is required.";
    if (!values.lastName) errorsList.lastName = "Field is required.";
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
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        const usersCollectionRef = collection(db, "users");
        const userDocRef = doc(usersCollectionRef, user.uid);

        await setDoc(userDocRef, {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          role: "client",
        });
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
                            name="firstName"
                            placeholder="First Name *"
                            className="form-control"
                            value={values.name}
                            onChange={handleInputChange}
                          />
                        </fieldset>
                        {errors.firstName && (
                          <span className={styles["form-validation"]}>
                            {errors.firstName}
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
                            type="text"
                            name="lastName"
                            placeholder="Last Name *"
                            className="form-control"
                            value={values.name}
                            onChange={handleInputChange}
                          />
                        </fieldset>
                        {errors.lastName && (
                          <span className={styles["form-validation"]}>
                            {errors.lastName}
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
}
