import FormField from "../../form-field/FormField";
import Button from "../../button/Button";
import { useForm } from "../../../hooks/useForm";

export default function BarberAdd() {
  const initialValues = {
    firstName: "",
    lastName: "",
    bio: "",
    photoUrl: "",
    summary: "",
  };

  const validators = {
    firstName: (value) => (!value ? "Field is required." : ""),
    lastName: (value) => (!value ? "Field is required." : ""),
    bio: (value) => (!value ? "Bio is required." : ""),
    summary: (value) => (!value ? "Summary is required." : ""),
  };

  // hooks
  const { values, handleInputChange, handleFormValidation, errors } = useForm(
    initialValues,
    validators
  );

  const handleFormSubmitClick = (e) => {
    e.preventDefault();

    if (handleFormValidation()) {
      handleFormSubmit();
    }
  };
  const handleFormSubmit = () => {};

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
              value={values.photoUrl}
              onChange={handleInputChange}
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
