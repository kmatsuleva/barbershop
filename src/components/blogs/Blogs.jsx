import { Outlet } from "react-router-dom";
import Banner from "../banner/Banner";

export default function Blogs() {
  return (
    <>
      <Banner heading="Our Blogs" />

      <section className="section-md bg-periglacial-blue">
        <div className="shell">
          <Outlet />
        </div>
      </section>
    </>
  );
}
