export default function Testimonial({ authorPhotoUrl, author, review }) {
  return (
    <div className="item">
      <blockquote className="quote-fullwidth">
        <div className="quote-fullwidth-left">
          <div className="quote-fullwidth-avatar">
            <img src={authorPhotoUrl} alt="" width="100" height="100" />
          </div>
        </div>
        <div className="quote-fullwidth-body">
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
