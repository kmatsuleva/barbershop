import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlogPost from "./blog-post/BlogPost";

export default function Blogs() {
  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
    centerMode: true,
    centerPadding: "0px",
  };

  const blogPosts = [
    {
      _id: 1,
      image: "images/blog-1-770x330.jpg",
      title: "Visiting a Barber",
      excerpt:
        "A barber knows how to cut men’s hair. If you’re like most men these days, you’re probably going to some unisex chain salon. Most of the time, you’d walk out of these places with an average haircut. Sometimes...",
      link: "single-post.html",
    },
    {
      _id: 2,
      image: "images/blog-2-770x330.jpg",
      title: "Visiting a Barber",
      excerpt:
        "A barber knows how to cut men’s hair. If you’re like most men these days, you’re probably going to some unisex chain salon. Most of the time, you’d walk out of these places with an average haircut. Sometimes...",
      link: "single-post.html",
    },
    {
      _id: 3,
      image: "images/blog-3-770x330.jpg",
      title: "Top 7 Shaving Products",
      excerpt:
        "The right shaving cream can make the difference between a healthy skin and one plagued by ingrown hairs, razor burns, irritation, and a variety of other issues that arise from nicks and cuts. In the times of old, people used soap when shaving and although there are still plenty of...",
      link: "single-post.html",
    },
  ];

  return (
    <section className="section-xl bg-periglacial-blue text-center">
      <div className="shell">
        <div className="range range-sm-center range-75">
          <div className="cell-xs-12">
            <h2>Latest blog posts</h2>
            <div className="p text-width-medium">
              <p className="big">
                Barbershop is not only a place where you can get a
                first-className haircut. Our barbers also write interesting
                articles on everything concerning their sphere of interest.
              </p>
            </div>
          </div>
          <div className="cell-xs-12">
            <div className="slider-container">
              <Slider {...settings}>
                {blogPosts.map((post) => (
                  <div key={post._id}>
                    <BlogPost {...post} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
