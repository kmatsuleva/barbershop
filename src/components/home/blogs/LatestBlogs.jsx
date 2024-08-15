import BlogsList from "../../blogs/blogs-list/BlogsList";

export default function FeaturedBlogs() {
  return (
    <section className="section-xl bg-periglacial-blue text-center">
      <div className="shell">
        <div className="range range-sm-center range-75">
          <div className="cell-xs-12">
            <h2>Latest blog posts</h2>
            <div className="p text-width-medium">
              <p className="big">
                Barbershop is not only a place where you can get a first-class
                haircut. Our barbers also write interesting articles on
                everything concerning their sphere of interest.
              </p>
            </div>
          </div>
          <div className="cell-xs-12">
            <BlogsList size={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
