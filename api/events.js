import axios from "axios";

export const sendEvent = async (data) => {
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/createEvent`,
    data
  );
  return response;
};

export const allEvent = async ({ page, limit, category }) => {
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/events/all?page=${page}&limit=${limit}&category=${category}`
  );
  return response;
};
export const event = async () => {
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/events/user`
  );
  return response;
};

export const eventById = async (id) => {
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/events/${id}`
  );
  return response;
};
