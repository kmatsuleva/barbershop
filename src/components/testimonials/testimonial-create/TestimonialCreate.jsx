import { useAuth } from "../../../hooks/useAuth";
import { useForm } from "../../../hooks/useForm";
import { useCreateTestimonial } from "../../../hooks/useTestimonials";
import Button from "../../button/Button";
import FormField from "../../form-field/FormField";

export default function TestimonialCreate({ barberId, refetchTestimonials }) {
  const initialValues = { review: "" };
  const validators = {
    review: (value) => (!value ? "Field is required." : null),
  };

  const { values, handleInputChange, handleFormValidation, errors } = useForm(
    initialValues,
    validators
  );
  const { createTestimonial } = useCreateTestimonial(barberId);
  const { user } = useAuth();

  const handleFormSubmitClick = async (event) => {
    event.preventDefault();

    if (handleFormValidation()) {
      const testimonialData = {
        author: `${user.firstName} ${user.lastName}`,
        authorPhotoUrl: "",
        review: values.review,
      };

      try {
        await createTestimonial(user.uid, testimonialData);
        refetchTestimonials();
        handleInputChange({ target: { name: 'review', value: '' } });
      } catch (error) {
        console.error("Failed to create testimonial:", error);
      }
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
