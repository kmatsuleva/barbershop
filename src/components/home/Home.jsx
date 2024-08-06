import Jumbotron from "./jumbotron/Jumbotron";
import AboutUs from "./about-us/AboutUs";
import FeaturedServices from "./services/FeaturedServices";
import BookNow from "./booking/BookNow";
import FeaturedBarbers from "./barbers/FeaturedBarbers";
import Blogs from "../blogs/Blogs";

export default function Home() {
  return (
    <>
      <Jumbotron />
      <AboutUs />
      <FeaturedServices />
      <BookNow />
      <FeaturedBarbers />
      <Blogs />
    </>
  );
}
