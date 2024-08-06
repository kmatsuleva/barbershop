import { Outlet } from "react-router-dom";

import Banner from "../banner/Banner";

export default function Barbers() {
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
}
