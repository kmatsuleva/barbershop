import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Booking() {
  const totalSteps = 3;
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service");

  const [step, setStep] = useState(serviceId ? "2" : "1");

  return (
    <div className="step-progress">
      <div className="step-progress-top">
        <span className="step-progress-number">{step}</span>
        <span>of</span>
        <span className="step-progress-number">{totalSteps}</span>
      </div>
      <div className="step-progress-bottom">
        <p className="step-progress-text">STEPs</p>
      </div>
    </div>
  );
}
