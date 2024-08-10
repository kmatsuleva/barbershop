import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import {
  useDeleteTestimonial,
  useGetUserTestimonials,
} from "../../../../hooks/useTestimonials";
import Loader from "../../../loader/Loader";
import FormField from "../../../form-field/FormField";

export default function UserTestimonials() {
  const { user } = useAuth();
  const { userTestimonials, loading, refetchTestimonials } =
    useGetUserTestimonials(user.uid);
  const { handleDeleteTestimonial } = useDeleteTestimonial();

  const [editMode, setEditMode] = useState(false);
  const [editedReview, setEditedReview] = useState("");

  const handleRenderTestimonialEdit = (testimonialId, review) => {
    setEditMode(testimonialId);
    setEditedReview(review);
  };

  const handleReviewChange = (event) => {
    setEditedReview(event.target.value);
  };

  const handleTestimonialEdit = (testimonialId, event) => {
    event.preventDefault();

    setEditMode(false);
    setEditedReview("");
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedReview("");
  };

  const handleTestimonialDelete = async (id) => {
    try {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete this testimonial?`
      );
      if (isConfirmed) {
        await handleDeleteTestimonial(id);
        refetchTestimonials();
      }
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  if (loading) return <Loader />;

  if (userTestimonials.length === 0) {
    return (
      <p className="big">You haven&apos;t submitted any testimonials yet.</p>
    );
  }

  return (
    <div className="cell-xs-12">
      <div className="range range-30 justify-center">
        {userTestimonials.map(
          ({ id, barberPhoto, barberId, barberName, review }) => (
            <div className="cell-xs-12 height-fill" key={id}>
              <div className="item">
                <blockquote className="flex flex-col flex-xl-row quote-fullwidth bg-gray p-4">
                  <div className="mr-5 mb-2 mb-xl-0">
                    <div className="quote-fullwidth-avatar mx-0">
                      <img
                        src={barberPhoto}
                        alt="Barber"
                        width="100"
                        height="100"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="quote-fullwidth-header">
                      <cite>
                        <Link to={`/barbers/${barberId}/details`}>
                          {barberName}
                        </Link>
                      </cite>
                    </div>
                    {editMode === id ? (
                      <>
                        <div className="mt-2">
                          <FormField
                            type="textarea"
                            name="review"
                            placeholder="Review *"
                            rows={5}
                            value={editedReview}
                            onChange={handleReviewChange}
                            className="quote-fullwidth-input"
                            // error={errors.review}
                          />
                        </div>
                        <ul className="inline-list inline-list-md">
                          <li>
                            <button
                              className="btn btn-xs btn-kangaroo-outline"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn btn-xs btn-primary"
                              onClick={(event) =>
                                handleTestimonialEdit(id, event)
                              }
                              disabled={
                                editedReview === review || !editedReview
                              }
                            >
                              Save
                            </button>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p className="quote-fullwidth-text mt-2">
                          <q>{review}</q>
                        </p>
                        <ul className="inline-list inline-list-md">
                          <li>
                            <button
                              className="btn btn-xs btn-primary"
                              onClick={() =>
                                handleRenderTestimonialEdit(id, review)
                              }
                            >
                              Edit review
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn btn-xs btn-primary"
                              onClick={() => handleTestimonialDelete(id)}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                </blockquote>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
