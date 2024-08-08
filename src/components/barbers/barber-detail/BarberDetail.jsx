import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Loader from "../../loader/Loader";
import Testimonials from "../../testimonials/Testimonials";
import Button from "../../button/Button";
import ButtonLink from "../../button-link/ButtonLink";
import TestimonialCreate from "../../testimonials/testimonial/testimonial-create/TestimonialCreate";
import { useGetOneBarber } from "../../../hooks/useBarbers";

export default function BarberDetail() {
  const { barberId } = useParams();
  const { barber, loading } = useGetOneBarber(barberId);
  const { isAuthenticated } = useAuth();

  const [isReviewButtonClicked, setReviewButtonClicked] = useState(false);

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
                      <span
                        className="icon icon-xxs icon-primary fa fa-calendar"
                        style={{
                          marginRight: "8px",
                          marginTop: "9px",
                        }}
                      ></span>
                      {/* {barber.workExperience} of experience */}
                    </div>
                    <div>
                      <a href="#">
                        <span
                          className="icon icon-xxs icon-primary fa fa-heart-o" // TODO: fa-heart if user added to fav.
                          style={{
                            marginRight: "8px",
                            marginTop: "9px",
                          }}
                        ></span>
                        <span style={{ color: "#014d55" }}>48</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="section-xl bg-periglacial-blue text-center">
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

              {isAuthenticated ? (
                isReviewButtonClicked ? (
                  <TestimonialCreate barberId={barberId} />
                ) : (
                  <Button
                    text="Write a review"
                    size="sm"
                    btnStyle="circle"
                    className="mt-3"
                    onClick={handleWriteReviewClick}
                  />
                )
              ) : (
                <ButtonLink
                  text="Log in to write a review"
                  url="/login"
                  size="sm"
                  btnStyle="circle"
                  className="mt-3"
                />
              )}

              <div className="cell-xs-12">
                <Testimonials />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
