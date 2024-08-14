import { useState, useRef } from "react";
import { useForm } from "../../../hooks/useForm";
import FormField from "../../form-field/FormField";
import Button from "../../button/Button";
import NoImage from "../../no-image/NoImage";
import { useEditBarber } from "../../../hooks/useBarbers";

export default function BarberEdit({ editingBarber, servicesList = [] }) {
  const initialValues = {
    firstName: editingBarber?.firstName || "",
    lastName: editingBarber?.lastName || "",
    bio: editingBarber?.bio || "",
    photoUrl: editingBarber?.photoUrl || "",
    summary: editingBarber?.summary || "",
  };

  const validators = {
    firstName: (value) => (!value ? "Field is required." : ""),
    lastName: (value) => (!value ? "Field is required." : ""),
    bio: (value) => (!value ? "Bio is required." : ""),
    summary: (value) => (!value ? "Summary is required." : ""),
  };

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const { values, handleInputChange, handleFormValidation, errors } = useForm(
    initialValues,
    validators
  );

  const { editBarber } = useEditBarber();

  const [selectedServices, setSelectedServices] = useState(
    editingBarber && editingBarber.services && editingBarber.services.length > 0
      ? editingBarber.services.map(
          (service) => service._key.path.segments.slice(-1)[0]
        )
      : []
  );

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedServices((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedServices((prevSelected) =>
        prevSelected.filter((serviceId) => serviceId !== value)
      );
    }
  };

  const handleFormSubmitClick = async (e) => {
    e.preventDefault();

    if (handleFormValidation()) {
      const formData = {
        ...values,
        services: selectedServices,
      };

      const success = await editBarber(editingBarber.id, formData, file);

      if (success) {
        Object.keys(initialValues).forEach((field) => {
          handleInputChange({ target: { name: field, value: "" } });
        });
        setFile(null);
        fileInputRef.current.value = "";
        setSelectedServices([]);
      }
    }
  };

  return (
    <div className="range range-30 mt-0">
      <div className="cell-xs-12">
        <div className="shell">
          <form onSubmit={handleFormSubmitClick}>
            <div className="fill-form">
              <div className="range">
                <div className="cell-sm-4 cell-md-3">
                  {values.photoUrl ? (
                    <img
                      className="w-full"
                      src={values.photoUrl}
                      alt="Barber"
                    />
                  ) : (
                    <NoImage />
                  )}
                  <div className="mt-3">
                    <input
                      type="file"
                      name="photoUrl"
                      onChange={handleFileChange}
                      className="flex m-auto"
                      ref={fileInputRef}
                    />
                  </div>
                </div>
                <div className="cell-sm-8 cell-md-9">
                  <div className="range mt-0">
                    <div className="cell-md-6">
                      <FormField
                        type="text"
                        name="firstName"
                        label="First Name *"
                        value={values.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                      />
                    </div>
                    <div className="cell-md-6 mt-1 mt-lg-0">
                      <FormField
                        type="text"
                        name="lastName"
                        label="Last Name *"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                      />
                    </div>
                  </div>
                  <div className="range mt-0">
                    <div className="cell-md-12 mt-1">
                      <FormField
                        type="textarea"
                        name="bio"
                        label="Bio *"
                        value={values.bio}
                        onChange={handleInputChange}
                        error={errors.bio}
                        rows={6}
                      />
                    </div>
                  </div>
                  <div className="range mt-1">
                    <div className="cell-md-12">
                      <FormField
                        type="textarea"
                        name="summary"
                        label="Summary *"
                        rows={6}
                        value={values.summary}
                        onChange={handleInputChange}
                        error={errors.summary}
                      />
                    </div>
                  </div>
                  <div className="range mt-2">
                    <div className="cell-md-12">
                      <p className="form-label-outside">Services:</p>
                      {Array.isArray(servicesList) &&
                        servicesList.length > 0 && (
                          <div className="range mt-1">
                            {servicesList.map((service) => (
                              <div
                                className="cell-sm-6 flex mt-0"
                                key={service.id}
                              >
                                <input
                                  type="checkbox"
                                  id={service.id}
                                  name="services"
                                  value={service.id}
                                  checked={selectedServices.includes(
                                    service.id
                                  )}
                                  onChange={handleServiceChange}
                                />
                                <label htmlFor={service.id} className="pl-2">
                                  {service.title}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="range">
                    <div className="cell-md-12 text-center">
                      <Button
                        type="submit"
                        text="Update"
                        size="sm"
                        btnStyle="circle"
                        className="btn-block"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
