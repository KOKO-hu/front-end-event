import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screen/home";
import { NativeBaseProvider } from "native-base";
import Login from "./screen/auth/login";

import Interest from "./screen/auth/interest";
import Explore from "./screen/tab/explore";
import { AuthContext } from "./context/auth-context";
import Uploadpictureprofil from "./screen/auth/upload-picture-profil";
import SignUp from "./screen/auth/sign-up";
import CodeVerify from "./screen/auth/code-verify";
import DetailEvent from "./screen/detail-event";
import Paiement from "./screen/paiement";
import CreateEvent from "./screen/events/create-event";
import descriptionEvent from "./screen/events/description-event";
import TicketEvent from "./screen/events/ticket-event";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <NativeBaseProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="uploadImage"
          component={Uploadpictureprofil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="interest"
          component={Interest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="verification"
          component={CodeVerify}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NativeBaseProvider>
  );
};
const AuthenticateStack = () => {
  return (
    <NativeBaseProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="explore"
          component={Explore}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="detailEvent"
          component={DetailEvent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="paiement"
          component={Paiement}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="createEvent"
          component={CreateEvent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="descriptionEvent"
          component={descriptionEvent}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="createTicketEvent"
          component={TicketEvent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NativeBaseProvider>
  );
};
const TabNavigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticateStack />}
    </NavigationContainer>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
