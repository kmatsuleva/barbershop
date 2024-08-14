import { useGetAllServices } from "../../../hooks/useServices";
import ButtonLink from "../../button-link/ButtonLink";
import GridCard from "../../cards/grid-card/GridCard";
import Loader from "../../loader/Loader";

export default function FeaturedServices() {
  const { servicesList, loading } = useGetAllServices();

  if (loading) {
    return <Loader />;
  }

  if (!servicesList || servicesList.length === 0) {
    return null;
  }

  return (
    <section className="bg-white">
      {/* TODO: Fix mobile view, it's different then other sections */}
      <div className="shell-fluid shell-condensed">
        <div className="range range-condensed">
          <div
            className="cell-md-6 cell-md-6-mod-1 image-wrap-left bg-white bg-image"
            style={{
              backgroundImage: "url(images/home-three-2-910x800.jpg)",
            }}
          >
            <div className="image-wrap-inner">
              <h2>
                OUR <br /> SERVICES
              </h2>
              <p className="big">
                Barbershop offers world-className men&apos;s haircuts, beard
                grooming, and hot razor shaves. Here are just some of the
                services we are famous for.
              </p>

              <ButtonLink url="/services" text="Read more" size="sm" />
            </div>
          </div>
          <div className="cell-md-6 cell-md-6-mod-2 image-wrap-right bg-gray-dark bg-image">
            <GridCard
              collection={servicesList}
              image="images/home-three-3-1011x800.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
