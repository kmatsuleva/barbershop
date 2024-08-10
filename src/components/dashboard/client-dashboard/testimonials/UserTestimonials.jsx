import { useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useGetUserTestimonials } from "../../../../hooks/useTestimonials";
import TestimonialEdit from "../../../testimonials/testimonial-edit/TestimonialEdit";
import Loader from "../../../loader/Loader";
import { useForm } from "../../../../hooks/useForm";
import { Link } from "react-router-dom";

export default function UserTestimonials() {
  const { user } = useAuth();
  const { userTestimonials, loading } = useGetUserTestimonials(user.uid);
  const [renderTestimonialEdit, setRenderTestimonialEdit] = useState(false);
  const [renderTestimonialsList, setRenderTestimonialsList] = useState(true);

  const { handleFormValidation } = useForm();

  const handleRenderTestimonialEdit = () => {
    setRenderTestimonialEdit(true);
    setRenderTestimonialsList(false);
  };

  const handleRenderTestimonialsList = () => {
    setRenderTestimonialsList(true);
    setRenderTestimonialEdit(false);
  };

  const handleTestimonialEdit = (event) => {
    event.preventDefault();
  };

  if (loading) {
    return <Loader />;
  }

  if (userTestimonials.length === 0)
    return (
      <p className="big">You haven&apos;t submitted any testimonials yet.</p>
    );

  if (renderTestimonialEdit) {
    return (
      <TestimonialEdit
        handleRenderTestimonialsList={handleRenderTestimonialsList}
        handleTestimonialEdit={handleTestimonialEdit}
      />
    );
  }

  if (renderTestimonialsList) {
    return (
      <>
        <div className="cell-xs-12">
          <div className="range range-30 justify-center">
            {userTestimonials.map((testimonial) => (
              <div className="cell-xs-12 height-fill" key={testimonial.id}>
                <div className="item">
                  <blockquote className="flex flex-row quote-fullwidth bg-gray p-3">
                    <div className="quote-fullwidth-left mr-3">
                      <div className="quote-fullwidth-avatar">
                        <img
                          src={testimonial.barberPhoto}
                          alt=""
                          width="100"
                          height="100"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="quote-fullwidth-body">
                      <div className="quote-fullwidth-header">
                        <cite>
                          <Link to={`/barbers/${testimonial.barberId}/details`}>
                            {testimonial.barberName}
                          </Link>
                        </cite>
                      </div>
                      <p className="quote-fullwidth-text">
                        <q>{testimonial.review}</q>
                      </p>
                      <ul className="inline-list inline-list-md">
                        <li>
                          {/* <Button size="xs" text="Edit review" /> */}
                          <button
                            className="btn btn-xs btn-primary"
                            onClick={handleRenderTestimonialEdit}
                          >
                            Edit review
                          </button>
                        </li>
                        <li>
                          {/* <Button size="xs" text="Delete" /> */}
                          <button className="btn btn-xs btn-primary">
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return null;
}
