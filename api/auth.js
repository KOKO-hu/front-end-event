import axios from "axios";

export const createUser = async (data) => {
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/create_user`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    }
  );
  return response;
};

export const authenticate = async (data) => {
  console.log(data)
    const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/login`,
    data
  );
  return response;
};

export const sendCodeAuth = async () => {
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/send-verification-code`
  );
  return response;
};

/* export const userLogin = async (data) => {
  console.log(data);
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/login`,
    data
  );
  return response;
}; */

export const getCodeAuth = async () => {
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/send-verification-code`
  );
  return response;
};

export const logout = async () => {
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/logout`
  );
  return response;
};
