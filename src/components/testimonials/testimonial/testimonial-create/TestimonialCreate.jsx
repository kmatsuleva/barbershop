import { useForm } from "../../../../hooks/useForm";
import Button from "../../../button/Button";
import FormField from "../../../form-field/FormField";

export default function TestimonialCreate({ barberId }) {
  const initialValues = { review: "" };
  const validators = {
    review: (value) => (!value ? "Field is required." : null),
  };

  const { values, handleInputChange, handleFormValidation, errors } = useForm(
    initialValues,
    validators
  );

  const handleFormSubmitClick = async (event) => {
    event.preventDefault();

    if (handleFormValidation()) {
      event.preventDefault();
    }
  };

  return (
    <div className="testimonial-create">
      <form onSubmit={handleFormSubmitClick}>
        <FormField
          type="textarea"
          name="review"
          placeholder="Review *"
          rows={5}
          value={values.review}
          onChange={handleInputChange}
          error={errors.review}
        />

        <Button type="submit" text="Submit Review" size="sm" />
      </form>
    </div>
  );
}
