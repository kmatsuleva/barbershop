import * as request from "./requester";

export const BASE_URL = "http://localhost:3030/data/testimonials";

const buildUrl = (barberId) => `${BASE_URL}/${barberId}/testimonials`;

const createTestimonial = async (barberId, text) =>
  request.post(BASE_URL, { barberId, text });

const getAllTestimonials = async (barberId) => {
  const result = await request.get(buildUrl(barberId));
  const testimonials = Object.values(result);

  return testimonials;
};

const testimonialsAPI = {
  createTestimonial,
  getAllTestimonials
};

export default testimonialsAPI;
