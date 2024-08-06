import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Testimonial from "./testimonial/Testimonial";

export default function Testimonials() {
  const testimonials = [
    {
      _id: 1,
      imageSrc: "/images/testimonials-1-100x100.jpg",
      firstName: "Matt",
      lastName: "Parker",
      quote:
        "I have taken my 3 yr old son for his first men’s haircut and now I’m glad he has such a fantastic look. I recommend any of the barbers at Barbershop for service and pride in their work. I believe my son would never be allowed to leave the chair without a really handsome cut.",
    },
    {
      _id: 2,
      imageSrc: "/images/testimonials-2-100x100.jpg",
      firstName: "John",
      lastName: "Miller",
      quote:
        "I wouldn’t go anywhere else in San Francisco. I’ve been coming here for the last year and I’ve never felt better about paying good money for a haircut. The guys know what they are doing, give solid advice, and cut like pros. I wasn’t used to this before but I’ll visit Barbershop again.",
    },
    {
      _id: 3,
      imageSrc: "/images/testimonials-3-100x100.jpg",
      firstName: "Anthony",
      lastName: "Smith",
      quote:
        "Polite, professional, charming and courteous team. The best haircut I have ever had! Simon was full of crack, was more than happy to suggest the best cut for me and he even offered a free beverage - what more could you want?! This barbershop is indeed my favorite one.",
    },
  ];

  return (
    <Swiper className="mySwiper">
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial._id}>
          <Testimonial {...testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
