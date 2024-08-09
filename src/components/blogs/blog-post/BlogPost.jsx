import { useParams } from "react-router-dom";
import { useGetOneBlog } from "../../../hooks/useBlogs";
import { formatDate } from "../../../utils/formatDate";
import Loader from "../../loader/Loader";
import Icon from "../../icon/Icon";

export default function BlogPost() {
  const { blogId } = useParams();
  const { blogPost, loading } = useGetOneBlog(blogId);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <a className="link link-primary link-return" href="/blogs">
        Back
      </a>
      <article className="post-single">
        <div
          className="post-single-header"
          style={{ backgroundImage: `url(${blogPost.image})` }}
        >
          <div className="post-single-header-content">
            <p className="post-single-title">{blogPost.title}</p>
            <ul className="post-single-meta">
              <li>
                <a href="#">
                  <Icon size="xxs" icon="heart-o" className="mr-1 pt-1" />
                  {/* TODO: icon=heart if user added to fav.*/}
                  <span>{blogPost.likes}</span>
                </a>
              </li>
              <li>
                <span className="icon icon-xxs fa fa-calendar-plus-o"></span>
                <time dateTime="2017-06-26">
                  {formatDate(blogPost.dateCreated.seconds)}
                </time>
              </li>
            </ul>
          </div>
        </div>
        <div className="post-single-body">{blogPost.content}</div>
      </article>
    </>
  );
}
