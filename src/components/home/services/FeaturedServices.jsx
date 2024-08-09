import ButtonLink from "../../button-link/ButtonLink";
import GridCard from "../../cards/grid-card/GridCard";

export default function FeaturedServices() {
  const collection = [
    {
      id: 1,
      iconUrl: "images/icon-service-light-3-70x62.png",
      title: "Beard trim",
      summary: "Well-trimmed beard is a must-have element of every men’s image",
    },
    {
      id: 2,
      iconUrl: "images/icon-service-light-4-70x62.png",
      title: "Mustache trim",
      summary: "Mustaches also need to be trimmed regularly",
    },
    {
      id: 3,
      iconUrl: "images/icon-service-light-1-70x62.png",
      title: "Traditional haircuts",
      summary: "One of the most popular services our barbers provide",
    },
    {
      id: 4,
      iconUrl: "images/icon-service-light-2-70x62.png",
      title: "Shaves",
      summary: "Our shaving services will make you look really handsome",
    },
  ];

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
              collection={collection}
              image="images/home-three-3-1011x800.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
