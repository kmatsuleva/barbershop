import { memo, useState } from "react";
import BookingStepTwo from "./step-two/BookingStepTwo";
import BookingStepOne from "./step-one/BookingStepOne";
import styles from "./Booking.module.css";
import BookingStepThree from "./step-three/BookingStepThree";
import BookingStepFour from "./step-four/BookingStepFour";

const Booking = () => {
  const totalSteps = 3;

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState({
    id: "",
    title: "",
  });
  const [selectedBarber, setSelectedBarber] = useState({
    id: "",
    name: "",
  });

  const handleStepBack = () => {
    setStep((step) => step - 1);
  };

  const handleStepForward = () => {
    setStep((step) => step + 1);
  };

  const handleGetService = (serviceData) => {
    setSelectedService(serviceData);
    handleStepForward();
  };

  const handleGetBarber = (barberData) => {
    setSelectedBarber(barberData);
  };

  return (
    <>
      <div className={styles["step-progress"]}>
        <div className={styles["step-progress-top"]}>
          <span className={styles["step-progress-number"]}>{step}</span>
          <span>of</span>
          <span className={styles["step-progress-number"]}>{totalSteps}</span>
        </div>
        <div className={styles["step-progress-bottom"]}>
          <p className={styles["step-progress-text"]}>STEPs</p>
        </div>
      </div>

      <div className={styles["custom-progress"]}>
        <div className={styles["customcustom-progress-body"]}></div>
      </div>

      {step === 1 && <BookingStepOne handleGetService={handleGetService} />}

      {step === 2 && (
        <BookingStepTwo
          serviceId={selectedService.id}
          handleStepBack={handleStepBack}
          handleStepForward={handleStepForward}
          handleGetBarber={handleGetBarber}
        />
      )}

      {/* {step === 3 && <BookingStepThree handleStepBack={handleStepBack} />} */}
      {step === 3 && (
        <BookingStepFour
          handleStepBack={handleStepBack}
          barber={selectedBarber}
          service={selectedService}
        />
      )}
    </>
  );
};

export default memo(Booking);
