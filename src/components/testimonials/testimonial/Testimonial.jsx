export default function Testimonial({ author, review, color }) {
  return (
    <div className="item">
      <blockquote className={`quote-fullwidth ${color ? `bg-${color}` : ""}`}>
        <div className="quote-fullwidth-body pl-0">
          <div className="quote-fullwidth-header">
            <cite>{author}</cite>
          </div>
          <p className="quote-fullwidth-text">
            <q>{review}</q>
          </p>
        </div>
      </blockquote>
    </div>
  );
}
