import { memo } from "react";
import { Outlet } from "react-router-dom";
import Banner from "../banner/Banner";

const Barbers = () => {
  return (
    <div>
      <Banner heading="Our Barbers" />

      <section className="section-xl bg-periglacial-blue text-center">
        <div className="shell">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default memo(Barbers);
