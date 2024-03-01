import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthHeaders } from "../storage";
export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authentificate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const authenticate = (token) => {
    setAuthHeaders(token); 
    setAuthToken(token);
    AsyncStorage.setItem('token',token)
  };
  const lagout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem('token')
  };
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authentificate: authenticate,
    logout: lagout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
