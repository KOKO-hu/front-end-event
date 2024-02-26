import { StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  Column,
  Input,
  KeyboardAvoidingView,
  Row,
  Select,
  Text,
} from "native-base";
import { useFonts } from "expo-font";
import { fonts } from "../../assets/fonts/font";
import { FontAwesome5 } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { infoUserReducer } from "../../redux/auth-reducer";
import { validateSignUp } from "../../helper/validator";
import * as SplashScreen from "expo-splash-screen";
import Back from "../../helper/back";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const SignUp = () => {
  const navigation = useNavigation();
  const [lastName, setLastName] = useState();
  const [firstName, setFirstName] = useState();
  const [tel, setTel] = useState();
  const [email, setEmail] = useState();
  const [categories, setCategories] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const registerUser = () => {
    const data = {
      lastName,
      firstName,
      tel,
      email,
      categories,
      password,
    };
    const { valid, errors } = validateSignUp(data);
    if (!valid) {
      setError(errors);
    } else {
      dispatch(infoUserReducer(data));
      setError(null);
      navigation.navigate("interest");

    }
  };

  /* font */
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
    <Box safeArea flex={1}>
      <Back />
      <KeyboardAwareScrollView>
        <Column p={4} h={"full"} justifyContent={"center"}>
          <Box>
            <Text fontSize={25} fontFamily={"Poppins-Bold"}>
              Commençons
            </Text>
          </Box>
          <Box>
            <Text fontSize={13} fontFamily={"Poppins-Regular"}>
              Veuillez entrez vos informations pour vous inscrire
            </Text>
          </Box>
          <Input
            my={5}
            keyboardType="email-address"
            bgColor={"white"}
            rounded={"3xl"}
            py={5}
            _focus={{
              borderColor: "#C0392B",
            }}
            value={lastName}
            onChangeText={(data) => setLastName(data)}
            leftElement={
              <Box px={5}>
                <>
                  <FontAwesome5 name="user-alt" size={24} color="black" />
                </>
              </Box>
            }
            rightElement={
              <Box px={5}>
                {error?.lastName && (
                  <MaterialIcons name="error" size={24} color="red" />
                )}
              </Box>
            }
            size="lg"
            placeholder="Nom*"
          />
          <Input
            my={5}
            py={5}
            _focus={{
              borderColor: "#C0392B",
            }}
            rounded={"3xl"}
            keyboardType="default"
            bgColor={"white"}
            value={firstName}
            onChangeText={(data) => setFirstName(data)}
            leftElement={
              <Box px={5}>
                <FontAwesome5 name="user-alt" size={24} color="black" />
              </Box>
            }
            rightElement={
              <Box px={5}>
                {error?.firstName && (
                  <MaterialIcons name="error" size={24} color="red" />
                )}
              </Box>
            }
            size="lg"
            placeholder="Prénom*"
          />
          <Input
            my={5}
            py={5}
            _focus={{
              borderColor: "#C0392B",
            }}
            rounded={"3xl"}
            value={tel}
            onChangeText={(data) => setTel(data)}
            keyboardType="number-pad"
            bgColor={"white"}
            leftElement={
              <Box px={5}>
                <Foundation name="telephone" size={24} color="black" />
              </Box>
            }
            rightElement={
              <Box px={5}>
                {error?.tel && (
                  <MaterialIcons name="error" size={24} color="red" />
                )}
              </Box>
            }
            size="lg"
            placeholder="Numéro de téléphone*"
          />
          <Input
            my={5}
            py={5}
            _focus={{
              borderColor: "#C0392B",
            }}
            rounded={"3xl"}
            keyboardType="email-address"
            bgColor={"white"}
            leftElement={
              <Box px={5}>
                <Zocial name="email" size={24} color="black" />
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
            value={email}
            onChangeText={(data) => setEmail(data)}
            placeholder="Email*"
          />
          <Box w={"100%"} my={5}>
            <Select
              py={5}
              _focus={{
                borderColor: "#C0392B",
              }}
              rounded={"3xl"}
              selectedValue={categories}
              onValueChange={(itemValue) => setCategories(itemValue)}
              leftElement={
                <Box px={5}>
                  <Feather name="grid" size={24} color="black" />
                </Box>
              }
              bgColor={"white"}
              size={"lg"}
              accessibilityLabel="Choose Service"
              placeholder="Catégorie*"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
            >
              <Select.Item label="Client" value="Client" />
              <Select.Item label="Organisateur" value="Organisateur" />
            </Select>
          </Box>
          <Input
            py={5}
            _focus={{
              borderColor: "#C0392B",
            }}
            rounded={"3xl"}
            my={5}
            value={password}
            onChangeText={(data) => {
              setPassword(data);
            }}
            bgColor={"white"}
            keyboardType="visible-password"
            leftElement={
              <Box px={5}>
                <Foundation name="key" size={24} color="black" />
              </Box>
            }
            rightElement={
              <Box px={2}>
                {error?.password ? (
                  <MaterialIcons name="error" size={24} color="red" />
                ) : (
                  <AntDesign name="eyeo" size={24} color="black" />
                )}
              </Box>
            }
            /*      rightElement={
              <Box px={5}>
              
              </Box>
            } */
            size="lg"
            placeholder="Mot de passe*"
          />
          <Box my={3}>
            <Button
              py={5}
              rounded={"3xl"}
              w={"100%"}
              _text={{ color: "white", fontFamily: "PoppinsSemiBold" }}
              borderColor={"#C0392B"}
              bgColor={"#C0392B"}
              my={2}
              onPress={() => registerUser()}
              /* variant="outline" */
              _pressed={{ bgColor: "#f2d7d4" }}
            >
              Commencer
            </Button>
          </Box>
        </Column>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default SignUp;
