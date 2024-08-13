import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { useAddBarber } from "../../../hooks/useBarbers";
import FormField from "../../form-field/FormField";
import Button from "../../button/Button";
import { useGetServicesByBarbers } from "../../../hooks/useServices";

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
  };

  const [file, setFile] = useState(null);

  // hooks
  const { values, handleInputChange, handleFormValidation, resetForm, errors } =
    useForm(initialValues, validators);
  const { addBarber } = useAddBarber();
  const { servicesList } = useGetServicesByBarbers();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
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
    <form onSubmit={handleFormSubmitClick}>
      <div className="fill-form">
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
              name="bio"
              placeholder="Bio *"
              value={values.bio}
              onChange={handleInputChange}
              error={errors.bio}
            />
          </div>
          <div className="cell-md-6 mt-1">
            <FormField
              type="file"
              name="photoUrl"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="range mt-1">
          <div className="cell-md-12">
            <FormField
              type="textarea"
              name="summary"
              placeholder="Summary *"
              rows={6}
              value={values.summary}
              onChange={handleInputChange}
              error={errors.summary}
            />
          </div>
        </div>
        <div className="range mt-2">
          <div className="cell-md-12">
            <p className="big">Services:</p>
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
                    checked={values.services.includes(service.id)}
                    onChange={handleServiceChange}
                  />
                  <label htmlFor={service.id} className="pl-2">{service.title}</label>
                </div>
              ))}
            </div>
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
    </form>
  );
}
