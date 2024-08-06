import ButtonLink from "../../button-link/ButtonLink";

export default function BookNow() {
  return (
    <section className="section-xl bg-periglacial-blue text-center">
      <div className="shell">
        <div className="range range-sm-center range-75">
          <div className="cell-xs-12">
            <div className="p text-width-medium">
              <p className="big">
                Discover a world of luxury and relaxation with our exclusive
                offerings. Whether you’re planning a weekend getaway or a
                special occasion, our top-notch amenities and personalized
                services promise an unforgettable stay.
              </p>
            </div>
            <ButtonLink url="/booking" text="Book now" size="sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
