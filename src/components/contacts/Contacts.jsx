import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import emailjs from "@emailjs/browser";

import { useForm } from "../../hooks/useForm";

import Banner from "../banner/Banner";
import SuccessSubmit from "./success-submit/SuccessSubmit";

import styles from "./Contacts.module.css";
import "leaflet/dist/leaflet.css";

export default function Contacts() {
  // variables
  const location = [47.717562, -122.303803];

  // states
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formHeight, setFormHeight] = useState(0);

  // hooks
  const { values, handleInputChange } = useForm({
    name: "",
    subject: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.offsetHeight);
    }
  }, []);

  // handlers
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleFormValidation = () => {
    const errorsList = {};

    if (!values.name) errorsList.name = "Name is required.";
    if (!values.email) {
      errorsList.email = "Email is required.";
    } else if (!validateEmail(values.email)) {
      errorsList.email = "Invalid email address.";
    }
    if (!values.message) errorsList.message = "Message is required.";

    setErrors(errorsList);
    return Object.keys(errorsList).length === 0;
  };

  const handleFormSubmit = () => {
    emailjs
      .send(
        "service_oe9htvf",
        "template_8sbjy3s",
        {
          from_name: values.name,
          message: values.message,
          email: values.email,
          subject: values.subject,
          phone_number: values.phoneNumber,
        },
        "ifs17BrdcP3gnmQDW"
      )
      .then((response) => {
        console.log("Email successfully sent!", response.status, response.text);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Failed to send the email.", error);
      });
  };

  const handleFormSubmitClick = (event) => {
    event.preventDefault();

    if (handleFormValidation()) {
      handleFormSubmit();
    }
  };

  return (
    <>
      <Banner heading="Contacts" />

      <section className="section-xl">
        <div className="range range-50">
          <div className="cell-xs-12">
            <div className="shell">
              <div className="range">
                <div className="cell-md-5">
                  <div>
                    <h3>Opening Hours</h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "70px",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        alignContent: "space-between",
                      }}
                    >
                      <dl>
                        <dt>Monday – Friday</dt>
                        <dd>9am - 6pm</dd>
                      </dl>
                      <dl>
                        <dt>Saturday</dt>
                        <dd>10am - 4pm</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="cell-md-7">
                  <div className="range">
                    <div className="cell-sm-6">
                      <h3>Phone number</h3>
                      <address>010-020-0340</address>
                    </div>

                    <div className="cell-sm-6">
                      <h3>Address</h3>
                      <address>
                        123 Street W, Seattle WA 99999 United States
                      </address>
                    </div>
                  </div>
                </div>
              </div>
              <div className="range range-50">
                <div className="cell-md-5">
                  <MapContainer
                    className={styles["map-container"]}
                    center={location}
                    zoom={13}
                    scrollWheelZoom={false}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={location} />
                  </MapContainer>
                </div>
                <div className="cell-md-7">
                  {isSubmitted ? (
                    <SuccessSubmit height={formHeight} />
                  ) : (
                    <form onSubmit={handleFormSubmitClick} ref={formRef}>
                      <div className="fill-form">
                        <div className="range">
                          <div className="cell-md-6 mt-1">
                            <fieldset
                              className={`${styles["form-group"]} ${
                                errors.name ? styles["has-error"] : ""
                              }`}
                            >
                              <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name *"
                                className={styles["form-control"]}
                                value={values.name}
                                onChange={handleInputChange}
                              />
                              {errors.name && (
                                <span className={styles["form-validation"]}>
                                  {errors.name}
                                </span>
                              )}
                            </fieldset>
                          </div>
                          <div className="cell-md-6 mt-1">
                            <fieldset className={styles["form-group"]}>
                              <input
                                type="text"
                                name="subject"
                                id="subject"
                                placeholder="Subject"
                                className={styles["form-control"]}
                                value={values.subject}
                                onChange={handleInputChange}
                              />
                            </fieldset>
                          </div>
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
                                id="email"
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
                            <fieldset className={styles["form-group"]}>
                              <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                placeholder="Phone number"
                                className={styles["form-control"]}
                                value={values.phoneNumber}
                                onChange={handleInputChange}
                              />
                            </fieldset>
                          </div>
                        </div>
                        <div className="range mt-1">
                          <div className="cell-md-12">
                            <fieldset
                              className={`${styles["form-group"]} ${
                                errors.message ? styles["has-error"] : ""
                              }`}
                            >
                              <textarea
                                name="message"
                                className={styles["form-control"]}
                                placeholder="Message *"
                                rows={6}
                                value={values.message}
                                onChange={handleInputChange}
                              ></textarea>
                              {errors.message && (
                                <span className={styles["form-validation"]}>
                                  {errors.message}
                                </span>
                              )}
                            </fieldset>
                          </div>
                        </div>
                        <div className="range">
                          <div className="cell-md-12 text-center">
                            <button
                              className="btn btn-sm btn-primary btn-block btn-circle"
                              type="submit"
                            >
                              Send Message Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
