import ButtonLink from "../button-link/ButtonLink";

export default function Forbidden() {
  return (
    <section className="section-sm bg-periglacial-blue one-screen-page-content text-center">
      <div className="shell">
        <h2>403</h2>
        <div className="p text-width-small">
          <p className="big">
            Oops! You don’t have permission to access this page.
          </p>
        </div>
        <div className="p text-width-small">
          <p className="big">
            It looks like you’re trying to reach a part of the site that you
            don’t have access to. This might be due to restricted permissions or
            other security settings.
          </p>
        </div>
        <ButtonLink url="/login" text="Back to login" />
      </div>
    </section>
  );
}