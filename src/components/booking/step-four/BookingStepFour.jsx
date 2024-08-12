import BackLink from "../../back-link/BackLink";
import Button from "../../button/Button";

export default function BookingStepFour({ handleStepBack, barber, service }) {
  return (
    <section className="section-xs bg-periglacial-blue one-screen-page-content text-center">
      <BackLink onClick={handleStepBack} />
      <div className="shell">
        <h2>ONE MORE STEP!</h2>
        <div className="p text-width-medium">
          <p className="big">
            To complete your appointment, please review all details described
            below. Don’t forget to provide your name and phone and telephone so
            that we could contact you.
          </p>
        </div>
        <div className="box-contacts box-contacts-vertical box-contacts-vertical-small box-wrap-content-interactive block-centered">
          <div className="box-contacts-col">
            {service && (
              <div className="box-contacts-block">
                <h3>Service:</h3>
                <p>{service.title}</p>
              </div>
            )}

            {barber && (
              <div className="box-contacts-block">
                <h3>Barber:</h3>
                <p>
                  {barber.firstName} {barber.lastName}`
                </p>
              </div>
            )}
            <div className="box-contacts-block">
              <h3>Date:</h3>
              <p>November 12 (12:00 - 13:00)</p>
            </div>
          </div>
          <div className="box-contacts-col box-contacts-right">
            <div className="box-contacts-block ">
              <Button size="sm" text="Book now" btnStyle="circle" className="flex m-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
