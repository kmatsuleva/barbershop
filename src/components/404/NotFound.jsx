import ButtonLink from "../button-link/ButtonLink";

export default function NotFound() {
  return (
    <section className="section-sm bg-periglacial-blue one-screen-page-content text-center">
      <div className="shell">
        <h2>404</h2>
        <div className="p text-width-small">
          <p className="big">
            The requested page couldn&apos;t be found - this could be due to a
            spelling error in the URL or a removed page.
          </p>
        </div>
        <ButtonLink url="/" text="Back to homepage" />
      </div>
    </section>
  );
}
