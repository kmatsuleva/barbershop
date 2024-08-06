import testimonialsAPI from "../api/testimonials-api";

export default function useCreateTestimonial() {
  const handleCreate = (barberId, review) =>
    testimonialsAPI.createTestimonial(barberId, review);

  return handleCreate;
}
