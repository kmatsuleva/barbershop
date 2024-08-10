import ButtonLink from "../button-link/ButtonLink";

export default function CommingSoon() {
  return (
    <div className="text-center h-full">
      <h2>Coming Soon</h2>
      <div className="p text-width-smaller">
        <p className="big">
          We are getting ready to launch our website in a few moments, so get
          ready and stay connected with the latest updates!
        </p>
      </div>
      <ButtonLink size="sm" url="/" text="Back to homepage" />
    </div>
  );
}
