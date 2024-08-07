import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
} from "../../service/firebase";

import { useForm } from "../../hooks/useForm";
import Button from "../button/Button";

import styles from "./Register.module.css";

export default function Register() {
  // variables
  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  };

  // states
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState("");

  // hooks
  const navigate = useNavigate();
  const { values, handleInputChange } = useForm(initialValues);

  // handlers
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\+?[1-9]\d{1,14}$/.test(phoneNumber);
  };

  const handleFormValidation = () => {
    const errorsList = {};

    if (!values.firstName) errorsList.firstName = "Field is required.";
    if (!values.lastName) errorsList.lastName = "Field is required.";
    if (!values.phoneNumber) {
      errorsList.phoneNumber = "Phone number is required.";
    } else if (!validatePhoneNumber(values.phoneNumber)) {
      errorsList.phoneNumber = "Invalid phone number.";
    }
    if (!values.email) {
      errorsList.email = "Email is required.";
    } else if (!validateEmail(values.email)) {
      errorsList.email = "Invalid email address.";
    }
    if (!values.password) {
      errorsList.password = "Password is required.";
    } else if (values.password.length < 6) {
      errorsList.password = "Password should be at least 6 characters.";
    }

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
          phoneNumber: values.phoneNumber,
          email: values.email,
          role: "client",
        });
        navigate("/");
      }
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

  return (
    <>
      <section className="section-xl">
        <div className="range range-50">
          <div className="cell-xs-12">
            <form onSubmit={handleFormSubmitClick}>
              <div className="shell">
                <div className="range">
                  <div className="cell-md-5 d-none d-lg-flex">
                    <img
                      src="/images/home-three-3-1011x800.jpg"
                      className="w-full h-full"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="cell-md-7 mt-0">
                    <div className="flex flex-col h-full justify-center text-center">
                      <h4>Welcome!</h4>
                      <p className="mb-3">
                        Register to book your next appointment, manage your
                        favorite barbers, and explore our latest blog posts.
                        Share your experience by writing testimonials and stay
                        connected with our community.
                      </p>
                      <div className="range mt-0">
                        <div className="cell-md-6 mt-1">
                          <fieldset
                            className={`${styles["form-group"]} ${
                              errors.firstName ? styles["has-error"] : ""
                            }`}
                          >
                            <input
                              type="text"
                              name="firstName"
                              placeholder="First Name *"
                              className={styles["form-control"]}
                              value={values.firstName}
                              onChange={handleInputChange}
                            />

                            {errors.firstName && (
                              <span className={styles["form-validation"]}>
                                {errors.firstName}
                              </span>
                            )}
                          </fieldset>
                        </div>

                        <div className="cell-md-6 mt-1">
                          <fieldset
                            className={`${styles["form-group"]} ${
                              errors.lastName ? styles["has-error"] : ""
                            }`}
                          >
                            <input
                              type="text"
                              name="lastName"
                              placeholder="Last Name *"
                              className={styles["form-control"]}
                              value={values.lastName}
                              onChange={handleInputChange}
                            />
                            {errors.lastName && (
                              <span className={styles["form-validation"]}>
                                {errors.lastName}
                              </span>
                            )}
                          </fieldset>
                        </div>
                      </div>

                      <div className="range mt-0">
                        <div className="cell-md-6 mt-1">
                          <fieldset
                            className={`${styles["form-group"]} ${
                              errors.phoneNumber ? styles["has-error"] : ""
                            }`}
                          >
                            <input
                              type="text"
                              name="phoneNumber"
                              placeholder="Phone Number *"
                              className={styles["form-control"]}
                              value={values.phoneNumber}
                              onChange={handleInputChange}
                            />

                            {errors.phoneNumber && (
                              <span className={styles["form-validation"]}>
                                {errors.phoneNumber}
                              </span>
                            )}
                          </fieldset>
                        </div>
                        <div className="cell-md-6 mt-1"></div>
                      </div>

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

                      {registerError && (
                        <div className="range mt-3">
                          <div className="cell-md-11 m-auto">
                            <p className={styles["error-msg"]}>
                              {registerError}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="range">
                        <div className="cell-md-12">
                          <Button
                            type="submit"
                            text="Register"
                            size="sm"
                            btnStyle="circle"
                            className="btn-block"
                          />
                        </div>
                      </div>

                      <div>
                        Have an account?
                        <Link
                          to="/login"
                          className={`ml-2 ${styles["create-account-link"]}`}
                        >
                          Log in
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
    </>
  );
}
