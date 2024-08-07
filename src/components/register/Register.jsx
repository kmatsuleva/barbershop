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
import FormField from "../form-field/FormField";

export default function Register() {
  // variables
  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  };

  const validators = {
    firstName: (value) => (!value ? "Field is required." : ""),
    lastName: (value) => (!value ? "Field is required." : ""),
    phoneNumber: (value) =>
      !value
        ? "Phone number is required."
        : !/^\+?[1-9]\d{1,14}$/.test(value)
        ? "Invalid phone number."
        : "",
    email: (value) =>
      !value
        ? "Email is required."
        : !/\S+@\S+\.\S+/.test(value)
        ? "Invalid email address."
        : "",
    password: (value) =>
      !value
        ? "Password is required."
        : value.length < 6
        ? "Password should be at least 6 characters."
        : "",
  };

  // states
  const [registerError, setRegisterError] = useState("");

  // hooks
  const navigate = useNavigate();
  const { values, handleInputChange, handleFormValidation, errors } = useForm(
    initialValues,
    validators
  );

  // handlers
  const handleRegister = async (event) => {
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
            <form onSubmit={handleRegister}>
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
                          <FormField
                            type="text"
                            name="firstName"
                            placeholder="First Name *"
                            value={values.firstName}
                            onChange={handleInputChange}
                            error={errors.firstName}
                          />
                        </div>

                        <div className="cell-md-6 mt-1">
                          <FormField
                            type="text"
                            name="lastName"
                            placeholder="Last Name *"
                            value={values.lastName}
                            onChange={handleInputChange}
                            error={errors.lastName}
                          />
                        </div>
                      </div>

                      <div className="range mt-0">
                        <div className="cell-md-6 mt-1">
                          <FormField
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number *"
                            value={values.phoneNumber}
                            onChange={handleInputChange}
                            error={errors.phoneNumber}
                          />
                        </div>
                        <div className="cell-md-6 mt-1"></div>
                      </div>

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
