import ServicesList from "../../services/service-list/ServiceList";

export default function BookingStepOne({ handleGetService }) {
  return (
    <section className="section-xl bg-periglacial-blue one-screen-page-content text-center">
      <div className="shell">
        <h2>CHOOSE a SERVICE</h2>
        <div className="p text-width-medium">
          <p className="big">
            On this page you can select a service that you need. Here are
            presented only the most popular barbering services we provide. If
            you require a personalized barbering service, please contact us.
          </p>
        </div>
         <ServicesList buttonText="Choose" handleGetService={handleGetService} />
      </div>
    </section>
  );
}
