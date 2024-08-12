import { useGetServicesByBarbers } from "../../../hooks/useServices";
import Loader from "../../loader/Loader";

export default function ServicesList({ handleGetService }) {
  const { servicesList, loading } = useGetServicesByBarbers();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {servicesList && servicesList.length > 0 ? (
        <>
          <div className="range range-30">
            {servicesList.map((service) => (
              <div className="cell-xs-6 cell-md-3" key={service.id}>
                <article
                  className={`card-service ${
                    handleGetService && "cursor-pointer"
                  }`}
                  onClick={() => handleGetService && handleGetService(service)}
                >
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
                </article>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">No services to display</p>
      )}
    </>
  );
}
