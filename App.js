import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./tab-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContextProvider, { AuthContext } from "./context/auth-context";
import { useContext, useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { setAuthHeaders } from "./storage";
const Root = () => {
  const [isTryingLoding, setIsTryingLoding] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authentificate(storedToken);
        setAuthHeaders(storedToken); 
      }
      setIsTryingLoding(false);
    };
    fetchToken();
  }, []);
  if (isTryingLoding) {
    return <AppLoading />;
  }
  return <TabNavigation />;
};
export default function App() {
  return (
    <>
      <Provider store={store}>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
      </Provider>
    </>
  );
}
