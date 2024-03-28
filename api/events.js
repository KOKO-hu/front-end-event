import axios from "axios";

export const sendEvent = async (data) => {
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/createEvent`,
    data
  );
  return response;
};

export const allEvent = async ({ page, limit, categorie_event }) => {
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/events/all?page=${page}&limit=${limit}&category=${categorie_event}`
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
/* ville */
export const cityAll = async ({searchCity}) => {
  console.log(searchCity);
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/cities?countryCode=${searchCity}`
  );
  return response;
};
/* quartier */
export const districtAll = async ({searchDistrict}) => {
  console.log(searchDistrict);
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/quartier?city=${searchDistrict}`
  );
  return response;
};
/* Pays */
export const countryAll = async () => {
  const response = await axios.get(
    `https://restcountries.com/v3.1/all?fields=name,flags,cca2`
  );
  return response;
};