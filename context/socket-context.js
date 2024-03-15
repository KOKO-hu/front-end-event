import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { io } from "socket.io-client";


export const SocketContext = createContext({});

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [onLineUser, setOnLineUser] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (isAuthenticated) {
      const socket = io(process.env.EXPO_PUBLIC_API_URL_SOCKET, {
        query: {
          userId: "5966dsfez6rfsrzerze6r8gvzag",
        },
      });
      setSocket(socket);
      socket.on("getOnLineUsers", (users) => {
        setOnLineUser(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [isAuthenticated]);
  return (
    <SocketContext.Provider value={{ socket, onLineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
