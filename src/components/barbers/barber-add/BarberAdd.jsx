import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { useAddBarber } from "../../../hooks/useBarbers";
import FormField from "../../form-field/FormField";
import Button from "../../button/Button";
import { useGetAllServices } from "../../../hooks/useServices";
import NoImage from "../../no-image/NoImage";

export default function BarberAdd({ handleFormClose }) {
  const initialValues = {
    firstName: "",
    lastName: "",
    bio: "",
    photoUrl: "",
    summary: "",
    services: [],
  };

  const validators = {
    firstName: (value) => (!value ? "Field is required." : ""),
    lastName: (value) => (!value ? "Field is required." : ""),
    bio: (value) => (!value ? "Bio is required." : ""),
    summary: (value) => (!value ? "Summary is required." : ""),
    services: (value) =>
      value.length === 0 ? "At least one service is required." : "",
  };

  const [file, setFile] = useState(null);

  const { values, handleInputChange, handleFormValidation, resetForm, errors } =
    useForm(initialValues, validators);
  const { addBarber } = useAddBarber();
  const { servicesList } = useGetAllServices();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    handleInputChange({
      target: {
        name: "photoUrl",
        value: selectedFile ? URL.createObjectURL(selectedFile) : "",
      },
    });
  };

  const handleServiceChange = (e) => {
    const { checked, value } = e.target;

    const updatedServices = checked
      ? [...values.services, value]
      : values.services.filter((service) => service !== value);

    handleInputChange({ target: { name: "services", value: updatedServices } });
  };

  const handleFormSubmitClick = async (e) => {
    e.preventDefault();

    if (handleFormValidation()) {
      const success = await addBarber(values, file);

      if (success) {
        resetForm();
        handleFormClose();
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
                      alt="Barber Preview"
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
                      <p className="form-label-outside">Services *</p>
                      <div className="range mt-1">
                        {servicesList.map((service) => (
                          <div className="cell-sm-6 flex mt-0" key={service.id}>
                            <input
                              type="checkbox"
                              id={service.id}
                              name="services"
                              value={service.id}
                              checked={values.services.includes(service.id)}
                              onChange={handleServiceChange}
                            />
                            <label htmlFor={service.id} className="pl-2">
                              {service.title}
                            </label>
                          </div>
                        ))}
                      </div>
                      {errors.services && (
                        <p className="error-text mt-1 text-medium"><small>{errors.services}</small></p>
                      )}
                    </div>
                  </div>
                  <div className="range">
                    <div className="cell-md-12 text-center">
                      <Button
                        type="submit"
                        text="Add"
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
