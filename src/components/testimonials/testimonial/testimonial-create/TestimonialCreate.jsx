import { useForm } from "../../../../hooks/useForm";
import Button from "../../../button/Button";

export default function TestimonialCreate({ barberId }) {
  const { values, handleInputChange } = useForm({
    review: "",
  });

  const handleFormSubmitClick = async (event) => {
    event.preventDefault();
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
