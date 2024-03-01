import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  Column,
  Input,
  KeyboardAvoidingView,
  Row,
  Text,
} from "native-base";
import { useFonts } from "expo-font";
import { fonts } from "../../assets/fonts/font";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/auth-context";
import Back from "../../helper/back";
import * as SplashScreen from "expo-splash-screen";
import { MaterialIcons } from "@expo/vector-icons";
import { validateSignIn, validateSignUp } from "../../helper/validator";
import { authenticate } from "../../api/auth";


const Login = () => {
  SplashScreen.preventAutoHideAsync();
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const signInHandler = async () => {
    const data = {
      email,
      password,
    };
    const { valid, errors } = validateSignIn(data);
    if (!valid) {
      setError(errors);
    } else {
      authenticate(data).then(({data})=>{
        console.log("User logged in", data.token);
         authCtx.authentificate( data.token) 
      }).catch((error) => {
        console.log("User error", error);
      });
    }
  };

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Box safeArea bgColor={"white"} flex={1}>
 
        <Back />
        <Column p={4} justifyContent={"center"} mt={8}>
          <Box>
            <Text fontSize={22} w={170} fontFamily={"Poppins-Bold"}>
              Hey, Bienvenue à nouveau
            </Text>
          </Box>
          <Input
            my={5}
            py={5}
            rounded={"3xl"}
            _focus={{
              borderColor: "#C0392B",
            }}
            keyboardType="email-address"
            bgColor={"white"}
            leftElement={
              <Box px={5}>
                <AntDesign name="mail" size={24} color="black" />
              </Box>
            }
            rightElement={
              <Box px={5}>
                {error?.email && (
                  <MaterialIcons name="error" size={24} color="red" />
                )}
              </Box>
            }
            size="lg"
            placeholder="Email"
            value={email}
            onChangeText={(data) => setEmail(data)}
          />
          <Input
            py={5}
            _focus={{
              borderColor: "#C0392B",
            }}
            rounded={"3xl"}
            bgColor={"white"}
            keyboardType="visible-password"
            value={password}
            onChangeText={(data) => setPassword(data)}
            leftElement={
              <Box px={5}>
                <Foundation name="key" size={24} color="black" />
              </Box>
            }
            rightElement={
              <>
                {error?.password ? (
                  <Box px={5}>
                    {error?.email && (
                      <MaterialIcons name="error" size={24} color="red" />
                    )}
                  </Box>
                ) : (
                  <Box px={2}>
                    <AntDesign name="eyeo" size={24} color="black" />
                  </Box>
                )}
              </>
            }
            size="lg"
            placeholder="Mot de passe"
          />
          <Row direction={"row-reverse"}>
            <Text
              fontFamily={"Poppins-Regular"}
              color={"#C0392B"}
              fontSize={12}
              my={2}
            >
              Mot de passe oublié ?
            </Text>
          </Row>
          <Box my={3}>
            <Button
              py={5}
              rounded={"3xl"}
              w={"100%"}
              _text={{ color: "white", fontFamily: "Poppins-Bold" }}
              borderColor={"#C0392B"}
              bgColor={"#C0392B"}
              my={2}
              /* variant="outline" */
                 _pressed={{ bgColor: "#f2d7d4" }} 
              onPress={() => signInHandler()}
            >
              Connexion
            </Button>
            <Row
              space={2}
              justifyContent={"flex-end"}
              alignItems={"center"}
              mx={3}
            >
              <Text fontSize={12} fontFamily={"Poppins-Regular"}>
                Vous n’avez pas de compte ?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
                <Text
                  color={"#C0392B"}
                  fontFamily={"Poppins-Regular"}
                  fontSize={12}
                >
                  S’inscrire maintenant
                </Text>
              </TouchableOpacity>
            </Row>
          </Box>
        </Column>
      
    </Box>
  );
};

export default Login;

const styles = StyleSheet.create({});
