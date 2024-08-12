import { Link } from "react-router-dom";
import { useGetAllServices } from "../../hooks/useServices";
import Banner from "../banner/Banner";
import Loader from "../loader/Loader";
import { useAuth } from "../../hooks/useAuth";

export default function Services() {
  const { servicesList, loading } = useGetAllServices();
  const { isAuthenticated } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Banner heading="Services" />

      <section className="section-lg bg-periglacial-blue text-center">
        <div className="shell">
          <div className="range range-sm-center range-50">
            <div className="cell-xs-12">
              <h2>OUR SERVICES</h2>
              <div className="p text-width-medium">
                <p className="big">
                  Barbershop offers world-className men's haircuts, beard
                  grooming, and hot razor shaves. Here are just some of the
                  services we are known for.
                </p>
              </div>
            </div>
            <div className="cell-xs-12">
              <div className="range range-30">
                {servicesList.map((service) => (
                  <div className="cell-xs-6 cell-md-3" key={service.id}>
                    <article className="card-service">
                      {service.iconDark && (
                        <img
                          className="card-service-image"
                          src={service.iconDark}
                          alt=""
                          width="70"
                          height="62"
                        />
                      )}

                      <p className="card-service-title">{service.title}</p>
                      <p className="card-service-price">
                        <small>$</small>
                        {service.price}.<small>00</small>
                      </p>
                      <Link
                        className="btn btn-sm card-service-control"
                        to={`/booking?service=${service.id}`}
                      >
                        {isAuthenticated
                          ? "Book Now"
                          : "Log in to Book"}
                      </Link>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
