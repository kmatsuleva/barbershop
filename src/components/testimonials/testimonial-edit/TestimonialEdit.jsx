import { useForm } from "../../../hooks/useForm";
import Button from "../../button/Button";
import FormField from "../../form-field/FormField";

export default function TestimonialEdit({
  review,
  handleRenderTestimonialsList,
  handleTestimonialEdit,
}) {
  const { values, handleInputChange, errors } = useForm({
    review: review,
  });

  return (
    <div>
      <div className="testimonial-create">
        <form onSubmit={handleTestimonialEdit}>
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

      <ul className="inline-list inline-list-md">
        <li>
          {/* <Button size="xs" text="Edit review" /> */}
          <button
            className="btn btn-xs btn-kangaroo-outline"
            onClick={handleRenderTestimonialsList}
          >
            Cancel
          </button>
        </li>
        <li>
          {/* <Button size="xs" text="Delete" /> */}
          <button className="btn btn-xs btn-primary">Save</button>
        </li>
      </ul>
    </div>
  );
}
