import Jumbotron from "./jumbotron/Jumbotron";
import AboutUs from "./about-us/AboutUs";
import FeaturedServices from "./services/FeaturedServices";
import ExperienceHighlight from "./experience-highlight/ExperienceHighlight";
// import BookNow from "./booking/BookNow";
import FeaturedBarbers from "./barbers/FeaturedBarbers";
import FeaturedBlogs from "./blogs/LatestBlogs";

export default function Home() {
  return (
    <>
      <Jumbotron />
      <AboutUs />
      <FeaturedServices />
      {/* <BookNow /> */}
      <ExperienceHighlight />
      <FeaturedBarbers />
      <FeaturedBlogs />
    </>
  );
}
