import { Link } from "react-router-dom";

export default function Maintenance() {
  return (
    <section className="section-sm bg-periglacial-blue one-screen-page-content text-center">
      <div className="shell">
        <h2>Maintenance</h2>
        <div className="p big">
          We&apos;re currently experiencing some technical difficulties with
          this page. Our team is working to resolve the issue as quickly as
          possible. In the meantime, please do
          <span>
            <Link
              to="/contact"
              className="inline-block px-2 link link-primary text-medium"
            >
              reach out to us
            </Link>
          </span>
          if you need assistance or have any questions. Thank you for your
          understanding and patience.
        </div>
      </div>
    </section>
  );
}
