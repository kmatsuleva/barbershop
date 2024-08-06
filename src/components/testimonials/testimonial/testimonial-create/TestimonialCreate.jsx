import testimonialsAPI from "../../../../api/testimonials-api";
import { useForm } from "../../../../hooks/useForm";
import useCreateTestimonial from "../../../../hooks/useTestimonials";
import Button from "../../../button/Button";

export default function TestimonialCreate({ barberId }) {
  const { values, handleInputChange } = useForm({
    review: "",
  });

  // const createTestimonial = useCreateTestimonial();

  const handleFormSubmitClick = async (event) => {
    event.preventDefault();
    
    const newTestimonial = await testimonialsAPI.createTestimonial(barberId, username, views.review)

    // createTestimonial(barberId, values.review);
  };

  return (
    <div className="testimonial-create">
      <form onSubmit={handleFormSubmitClick}>
        <fieldset className="form-group">
          <textarea
            name="review"
            value={values.review}
            onChange={handleInputChange}
            placeholder="Review *"
            rows="5"
            className="form-control"
          />
        </fieldset>

        <Button type="submit" text="Submit Review" size="sm" />
      </form>
    </div>
  );
}
