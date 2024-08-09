import { useGetAllBlogs } from "../../../hooks/useBlogs";
import ButtonLink from "../../button-link/ButtonLink";
import ThumbnailCard from "../../cards/thumbnail-card/ThumbnailCard";
import Loader from "../../loader/Loader";

export default function BlogsList({ size }) {
  const { blogPosts, loading } = useGetAllBlogs();

  if (loading) {
    return <Loader />;
  }

  const displayedBlogs = size ? blogPosts.slice(0, size) : blogPosts;

  return (
    <>
      {displayedBlogs.length > 0 ? (
        <>
          <div className="range range-30">
            {displayedBlogs.map((blog) => (
              <div className="cell-sm-6 cell-md-4 height-fill" key={blog.id}>
                <ThumbnailCard
                  image={blog.image}
                  header={blog.title}
                  body={blog.summary}
                  detailsUrl={`/blogs/${blog.id}/details`}
                />
              </div>
            ))}
          </div>
          {size && (
            <div className="range range-30">
              <div className="cell-xs-12">
                <ButtonLink url="/blogs" text="View all blogs" size="sm" />
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-center">No blogs to display</p>
      )}
    </>
  );
}
