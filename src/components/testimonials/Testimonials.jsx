import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Testimonial from "./testimonial/Testimonial";

export default function Testimonials({ testimonials }) {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <Testimonial {...testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
