export default function AboutUs() {
  return (
    <section className="section-xl bg-periglacial-blue text-center text-md-left">
      <div className="shell-fluid shell-condensed">
        <div className="range range-md-reverse range-xs-middle range-md-right range-50">
          <div className="cell-md-5 cell-lg-4">
            <div className="inset-1">
              <h2>WHO WE ARE</h2>
              <div className="p text-width-smallest">
                <p className="big">
                  Barbershop is a team of highly qualified barbers dedicated to
                  offering the best value. We do this by providing high quality
                  salon services for men and boys, in a warm, friendly
                  atmosphere.
                </p>
              </div>
            </div>
          </div>
          <div className="cell-md-7 cell-lg-6">
            <div className="row row-gutter-custom range-15">
              <div className="col-xs-4">
                <figure className="figure-fullwidth">
                  <img
                    src="images/about-1-300x460.jpg"
                    alt=""
                    width="300"
                    height="460"
                  />
                </figure>
              </div>
              <div className="col-xs-4">
                <figure className="figure-fullwidth">
                  <img
                    src="images/about-2-300x460.jpg"
                    alt=""
                    width="300"
                    height="460"
                  />
                </figure>
              </div>
              <div className="col-xs-4">
                <figure className="figure-fullwidth">
                  <img
                    src="images/about-3-300x460.jpg"
                    alt=""
                    width="300"
                    height="460"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
