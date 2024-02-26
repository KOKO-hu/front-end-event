import axios from "axios";

export const setAuthHeaders = async (token) => {
    axios.defaults.headers.authorization = `Bearer ${token}`;
    /* await setSecureData("token", token); */
  };