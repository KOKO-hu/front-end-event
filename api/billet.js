import axios from "axios";


export const ticketByIdUpComing = async ({ page, limit }) => {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/ticketByIdUpComing?page=${page}&limit=${limit}`
    );
    return response;
  };

  export const ticketByIdUpPast = async ({ page, limit }) => {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/ticketByIdUpPast?page=${page}&limit=${limit}`
    );
    return response;
  };

  export const detailTicketByUser= async ({ id }) => {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/tickets/${id}`
    );
    return response;
  };