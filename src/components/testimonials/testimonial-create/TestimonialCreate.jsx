import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useUsers } from "../../../hooks/useUsers";
import { useForm } from "../../../hooks/useForm";
import { useCreateTestimonial } from "../../../hooks/useTestimonials";
import Button from "../../button/Button";
import FormField from "../../form-field/FormField";

export default function TestimonialCreate({ barberId, refetchTestimonials }) {
  const [userDetails, setUserDetails] = useState(null);
  const { values, handleInputChange, handleFormValidation, errors, resetForm } = useForm(
    { review: "" },
    { review: value => (!value ? "Field is required." : null) }
  );
  const { createTestimonial } = useCreateTestimonial(barberId);
  const { user } = useAuth();
  const { fetchUserDetails } = useUsers();

  useEffect(() => {
    const fetchDetails = async () => {
      if (user) {
        const details = await fetchUserDetails(user);
        setUserDetails(details);
      }
    };

    fetchDetails();
  }, [user, fetchUserDetails]);

  const handleFormSubmitClick = async (event) => {
    event.preventDefault();

    if (!handleFormValidation() || !userDetails) return;

    const testimonialData = {
      author: `${userDetails.firstName} ${userDetails.lastName}`,
      authorPhotoUrl: "",
      review: values.review,
    };

    try {
      await createTestimonial(user, testimonialData);
      refetchTestimonials();
      resetForm();
    } catch (error) {
      console.error("Failed to create testimonial:", error);
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
