import { useAuth } from "../../../../hooks/useAuth";
import { useGetUserTestimonials } from "../../../../hooks/useTestimonials";
import Testimonial from "../../../testimonials/testimonial/Testimonial";

export default function UserTestimonials() {
  const { user } = useAuth();
  const { userTestimonials } = useGetUserTestimonials(user.uid);

  return (
    <>
      <div className="range range-30">
        {userTestimonials.map((testimonial) => (
          <div className="cell-xs-12 height-fill" key={testimonial.id}>
            <Testimonial
              authorPhotoUrl={testimonial.authorPhotoUrl}
              author={testimonial.author}
              review={testimonial.review}
              color="gray"
            />
          </div>
        ))}
      </div>
    </>
  );
}
