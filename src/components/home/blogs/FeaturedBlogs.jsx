import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAllBlogs } from "../../../hooks/useBlogs";
import BlogPost from "./blog-post/BlogPost";
import Loader from "../../loader/Loader";

export default function FeaturedBlogs() {
  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    centerPadding: 0,
  };

  const { blogPosts, loading } = useGetAllBlogs();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="section-xl bg-periglacial-blue text-center">
      <div className="shell">
        <div className="range range-sm-center range-75">
          <div className="cell-xs-12">
            <h2>Latest blog posts</h2>
            <div className="p text-width-medium">
              <p className="big">
                Barbershop is not only a place where you can get a first-class haircut. Our barbers also write interesting articles on everything concerning their sphere of interest.
              </p>
            </div>
          </div>
          <div className="cell-xs-12">
            <div className="slider-container">
              <Slider {...settings}>
                {blogPosts.map((post) => (
                  <div key={post.id}>
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
