import axios from "axios";

/* Favorie */
export const postFavorie = async (data) => {

  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/favories`,
    data
  );
  return response;
};
/* get Favorie */
export const getFavories = async () => {

    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/favories`
  
    );
    return response;
  };
/* get Favorie user */
export const getFavoriesByUser = async () => {

    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/favoriesUser`
    );
    return response;
  };
  /*  */
  export const deleteFavorie = async (favoriteId) => {
   /*  console.log("favoriteId._id",favoriteId) */
    const response = await axios.delete(
      `${process.env.EXPO_PUBLIC_API_URL}/favorites/${favoriteId}`
    );
    return response;
  };
