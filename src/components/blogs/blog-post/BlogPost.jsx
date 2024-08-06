export default function BlogPost() {
  return (
    <article className="post-classic">
      <img
        className="post-classic-image"
        src="images/blog-3-770x330.jpg"
        alt=""
        width="770"
        height="330"
      />
      <div className="post-classic-body">
        <p className="post-classic-title">
          <a href="single-post.html">Top 7 Shaving Products</a>
        </p>
        <div className="post-classic-text">
          <p>
            The right shaving cream can make the difference between a healthy
            skin and one plagued by ingrown hairs, razor burns, irritation, and
            a variety of other issues that arise from nicks and cuts. In the
            times of old, people used soap when shaving and although there are
            still plenty of...
          </p>
        </div>
        <div className="post-classic-footer">
          <div className="post-classic-footer-left">
            <a
              className="btn btn-xs btn-primary btn-circle"
              href="single-post.html"
            >
              READ MORE
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
