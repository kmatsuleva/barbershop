import ButtonLink from "../../button-link/ButtonLink";

export default function Jumbotron() {
  return (
    <section
      className="jumbotron-custom jumbotron-custom-3 bg-white bg-image bg-image-custom bg-image-center"
      style={{ backgroundImage: "url(images/home-three-1-1920x800.jpg)" }}
    >
      <div className="jumbotron-custom-content text-center">
        <div className="shell">
          <div className="range range-sm-center">
            <div className="cell-sm-9 cell-md-8 cell-lg-7">
              <h1>Enjoy our barber services</h1>
              <p className="large">
                Establish your new amazing look with Barbershop services! From
                haircuts to hot shaves, you can experience the best level of
                barbering in the area.
              </p>
              {/* <ButtonLink url="/booking" text="Book now" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
