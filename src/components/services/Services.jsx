import { useGetServicesByBarbers } from "../../hooks/useServices";
import { useAuth } from "../../hooks/useAuth";
import Banner from "../banner/Banner";
import ServicesList from "./service-list/ServiceList";
import Maintenance from "../maintenance/Maintenance";
import { Link } from "react-router-dom";
import ButtonLink from "../button-link/ButtonLink";

export default function Services() {
  const { servicesList, loading } = useGetServicesByBarbers();
  const { isAuthenticated } = useAuth();

  if (!loading && (!servicesList || servicesList.length === 0)) {
    return <Maintenance />;
  }

  return (
    <div>
      <Banner heading="Services" />

      <section className="section-lg bg-periglacial-blue text-center">
        <div className="shell">
          <ServicesList servicesList={servicesList} />
          {/* <ButtonLink
            size="sm"
            url={`/booking`}
            text={isAuthenticated ? "Book now" : "Log in to Book"}
            className="mt-6"
          /> */}
        </div>
      </section>
    </div>
  );
}
