import BackLink from "../../back-link/BackLink";

export default function BookingStepThree({ handleStepBack }) {
  return (
    <>
      <section className="section-xs bg-periglacial-blue one-screen-page-content text-center">
        <BackLink onClick={handleStepBack} />

        <div className="shell">
          <h2>Choose a Date</h2>
          <div className="p text-width-medium">
            <p className="big">
              To complete your booking, please choose the date and time that fit
              you best. We will be glad to offer you top-notch barber services
              on the selected day.
            </p>
          </div>

   
        </div>
      </section>
    </>
  );
}
