import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "../../hooks/useForm";
import Banner from "../banner/Banner";
import SuccessSubmit from "./success-submit/SuccessSubmit";
import Button from "../button/Button";
import FormField from "../form-field/FormField";
import Map from "../map/Map";

export default function Contacts() {
  // variables
  const initialValues = {
    name: "",
    subject: "",
    email: "",
    phoneNumber: "",
    message: "",
  };

  const validators = {
    name: (value) => (!value ? "Name is required." : ""),
    email: (value) =>
      !value
        ? "Email is required."
        : !/\S+@\S+\.\S+/.test(value)
        ? "Invalid email address."
        : "",
    message: (value) => (!value ? "Message is required." : ""),
  };

  // states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formHeight, setFormHeight] = useState(0);

  // hooks
  const { values, handleInputChange, handleFormValidation, errors } = useForm(
    initialValues,
    validators
  );
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.offsetHeight);
    }
  }, []);

  // handlers
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
                    <div className="big flex gap-7 items-start justify-start space-between">
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
                    <div className="cell-sm-6 big">
                      <h3>Phone number</h3>
                      <address>010-020-0340</address>
                    </div>

                    <div className="cell-sm-6 big">
                      <h3>Address</h3>
                      <address>
                        123 Street W, Seattle WA 99999 United States
                      </address>
                    </div>
                  </div>
                </div>
              </div>
              <div className="range mt-3">
                <div className="cell-md-5">
                  <Map />
                </div>
                <div className="cell-md-7">
                  {isSubmitted ? (
                    <SuccessSubmit height={formHeight} />
                  ) : (
                    <form onSubmit={handleFormSubmitClick} ref={formRef}>
                      <div className="fill-form">
                        <div className="range">
                          <div className="cell-md-6 mt-1">
                            <FormField
                              type="text"
                              name="name"
                              placeholder="Name *"
                              value={values.name}
                              onChange={handleInputChange}
                              error={errors.name}
                            />
                          </div>
                          <div className="cell-md-6 mt-1">
                            <FormField
                              type="text"
                              name="subject"
                              placeholder="Subject"
                              value={values.subject}
                              onChange={handleInputChange}
                            />
                          </div>
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
                              type="text"
                              name="phoneNumber"
                              placeholder="Phone number"
                              value={values.phoneNumber}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="range mt-1">
                          <div className="cell-md-12">
                            <FormField
                              type="textarea"
                              name="message"
                              placeholder="Message *"
                              rows={6}
                              value={values.message}
                              onChange={handleInputChange}
                              error={errors.message}
                            />
                          </div>
                        </div>
                        <div className="range">
                          <div className="cell-md-12 text-center">
                            <Button
                              type="submit"
                              text="Send Message Now"
                              size="sm"
                              btnStyle="circle"
                              className="btn-block"
                            />
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
