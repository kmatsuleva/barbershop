import { useGetBarbersByService } from "../../../hooks/useBarbers";
import BackLink from "../../back-link/BackLink";
import Button from "../../button/Button";

export default function BookingStepTwo({
  serviceId,
  handleStepBack,
  handleStepForward,
  handleGetBarber,
}) {
  const { barberServices } = useGetBarbersByService(serviceId);

  if (!barberServices || barberServices.length === 0) {
    return (
      <section className="py-6 bg-periglacial-blue one-screen-page-content text-center">
        <p>No barbers available for this service.</p>;
      </section>
    );
  }

  return (
    <section className="section-xs bg-periglacial-blue one-screen-page-content text-center">
      <BackLink onClick={handleStepBack} />

      {barberServices && barberServices.length > 0 && (
        <div className="shell">
          <h2>CHOOSE a BARBER</h2>
          <div className="p text-width-medium">
            <p className="big">
              Barbershop offers professional services of certified barbers with
              years of experience. On this page you can choose a preferred
              barber in a few clicks.
            </p>
          </div>

          <div className="range range-lg-center">
            <div className="cell-lg-10">
              <div className="range range-sm-center range-md-left range-30">
                {barberServices.map((barber) => (
                  <div className="cell-sm-8 cell-md-6" key={barber.id}>
                    <div className="thumbnail-option">
                      <div className="thumbnail-option-left">
                        <img
                          src={
                            barber.photoUrl
                              ? barber.photoUrl
                              : "/images/missing-img.png"
                          }
                          alt=""
                          width="170"
                          height="180"
                        />
                      </div>
                      <div className="thumbnail-option-body">
                        <div className="thumbnail-option-title">
                          {barber.firstName} {barber.lastName}
                        </div>
                        <ul className="thumbnail-option-list">
                          <li>mo</li>
                          <li className="active">tu</li>
                          <li className="active">we</li>
                          <li>th</li>
                          <li className="active">fr</li>
                          <li>st</li>
                          <li>sn</li>
                        </ul>
                        <div className="thumbnail-option-panel">
                          <Button
                            onClick={() => {
                              handleStepForward();
                              handleGetBarber({
                                id: barber.id,
                                firstName: barber.firstName,
                                lastName: barber.lastName,
                              });
                            }}
                            size="xs"
                            text="Choose"
                            btnStyle="circle"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
