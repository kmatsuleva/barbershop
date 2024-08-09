import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useGetOneBarber } from "../../../hooks/useBarbers";
import { useGetBarberTestimonials } from "../../../hooks/useTestimonials";
import Loader from "../../loader/Loader";
import Button from "../../button/Button";
import ButtonLink from "../../button-link/ButtonLink";
import Icon from "../../icon/Icon";
import Testimonials from "../../testimonials/Testimonials";
import TestimonialCreate from "../../testimonials/testimonial-create/TestimonialCreate";

export default function BarberDetail() {
  const [isReviewButtonClicked, setReviewButtonClicked] = useState(false);

  const { barberId } = useParams();
  const { barber, loading } = useGetOneBarber(barberId);
  const { isAuthenticated } = useAuth();
  const { testimonials, refetchTestimonials } =
    useGetBarberTestimonials(barberId);

  const handleWriteReviewClick = () => {
    setReviewButtonClicked(true);
  };

  return (
    <>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="range range-sm-center range-75">
            <div className="cell-xs-12">
              <div className="thumbnail-fullwidth">
                <div className="thumbnail-fullwidth-left">
                  <img src={barber.photoUrl} alt="" width="400" height="480" />
                </div>
                <div className="thumbnail-fullwidth-body">
                  <p className="thumbnail-fullwidth-header">
                    {barber.firstName} {barber.lastName}
                  </p>

                  <div className="thumbnail-fullwidth-text">
                    <p>{barber.bio}</p>
                  </div>
                  <div
                    className="reveal-flex"
                    style={{
                      marginTop: "25px",
                      columnGap: "30px",
                      color: "black",
                      fontWeight: 500,
                    }}
                  >
                    <div>
                      <Icon
                        size="xxs"
                        icon="calendar"
                        color="primary"
                        className="mr-2 pt-1"
                      />
                      {/* {barber.workExperience} of experience */}
                    </div>
                    <div>
                      <a href="#">
                        <Icon
                          size="xxs"
                          icon="heart-o"
                          color="primary"
                          className="mr-2 pt-1"
                        />
                        <span className="text-primary">48</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="section-xl bg-periglacial-blue text-center pb-0">
          <div className="shell">
            <div className="range range-sm-center range-75">
              <div className="cell-xs-12">
                <h2>Testimonials</h2>
                <div className="p text-width-medium">
                  <p className="big">
                    These reviews that our clients have recently submitted are
                    the best way to learn more about our barbershop’s level of
                    service and customer support.
                  </p>
                </div>
              </div>

              {isReviewButtonClicked ? (
                <div className="cell-md-9 cell-lg-7">
                  <TestimonialCreate
                    barberId={barberId}
                    refetchTestimonials={refetchTestimonials}
                  />
                </div>
              ) : (
                <div className="unit unit-spacimg-md unit-xs-horizontal unit-align-center unit-middle">
                  <div className="unit-left text-sm-right">
                    <div className="list-rating">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Icon
                          key={index}
                          size="xxs"
                          icon="star"
                          color="primary"
                        />
                      ))}
                    </div>
                    <p className="small">Your feedback is Valuable!</p>
                  </div>
                  <div className="unit-body">
                    {isAuthenticated ? (
                      <Button
                        text="Write a review"
                        size="xs"
                        btnStyle="circle"
                        onClick={handleWriteReviewClick}
                      />
                    ) : (
                      <ButtonLink
                        text="Log in to write a review"
                        url="/login"
                        size="xs"
                        btnStyle="circle"
                      />
                    )}
                  </div>
                </div>
              )}

              {testimonials.length > 0 && (
                <div className="cell-xs-12">
                  <Testimonials testimonials={testimonials} />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
