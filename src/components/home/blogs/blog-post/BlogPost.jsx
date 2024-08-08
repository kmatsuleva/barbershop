import { Link } from "react-router-dom";
import ButtonLink from "../../../button-link/ButtonLink";

export default function BlogPost({ id, image, title, summary }) {
  return (
    <article className="post-classic">
      <img
        className="post-classic-image"
        src={image}
        alt=""
        width="770"
        height="330"
      />
      <div className="post-classic-body">
        <p className="post-classic-title">
          <Link to={`/blogs/${id}/details`}>{title}</Link>
        </p>
        <div className="post-classic-text">
          <p>{summary}</p>
        </div>
        <div className="post-classic-footer">
          <div className="post-classic-footer-left">
            <ButtonLink
              size="xs"
              btnStyle="circle"
              url={`/blogs/${id}/details`}
              text="Read more"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
