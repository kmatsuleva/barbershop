import requester from "./requester";

export const BASE_URL = "http://localhost:3030/jsonstore/barbers";

export const getAllBarbers = async () => {
  const result = await requester.get(`${BASE_URL}`);
  const barbers = Object.values(result);

  return barbers;
};

export const getBarber = (barberId) =>
  requester.get(`${BASE_URL}/${barberId}`);

const barbersAPI = {
  getAllBarbers,
  getBarber,
};

export default barbersAPI;