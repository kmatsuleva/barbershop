import BarbersList from "../../barbers/barbers-list/BarbersList";

export default function FeaturedBarbers() {
  return (
    <section
      className="section-xl bg-gray-dark bg-image text-center"
      style={{ backgroundImage: "url(images/bg-image-1.jpg)" }}
    >
      <div className="shell">
        <div className="range range-50">
          <div className="cell-xs-12">
            <h2>OUR BARBERS</h2>
            <div className="p text-width-medium">
              <p className="big">
                We employ only highly qualified barbers who are not just
                professionals, but also enjoy maintaining the atmosphere of a
                classic barbershop.
              </p>
            </div>
          </div>
          <div className="cell-xs-12">
            <BarbersList size={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
