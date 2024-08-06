export default function Testimonial({ imageSrc, firstName, lastName, quote }) {
  return (
    <div className="item">
      <blockquote className="quote-fullwidth">
        <div className="quote-fullwidth-left">
          <div className="quote-fullwidth-avatar">
            <img src={imageSrc} alt="" width="100" height="100" />
          </div>
        </div>
        <div className="quote-fullwidth-body">
          <div className="quote-fullwidth-header">
            <cite>
              {firstName} {lastName}
            </cite>
          </div>
          <p className="quote-fullwidth-text">
            <q>{quote}</q>
          </p>
        </div>
      </blockquote>
    </div>
  );
}
