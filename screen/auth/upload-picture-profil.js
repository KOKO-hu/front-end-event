import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Center,
  Column,
  Image,
  Progress,
  Text,
} from "native-base";
import { useFonts } from "expo-font";
import { fonts } from "../../assets/fonts/font";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createUser, sendCodeAuth } from "../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import Back from "../../helper/back";
import { useNavigation } from "@react-navigation/native";
import { infoUserReducer } from "../../redux/auth-reducer";
import { setAuthHeaders } from "../../storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Uploadpictureprofil = () => {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const responseUseSlt = useSelector((state) => state.authReducer);
  const disaptch = useDispatch();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProgress(100);
      setImage(result);
    }
  };
  /*  */
  const handleRegister = async () => {
    let file = {
      uri: image.assets[0].uri,
      name: image.assets[0].uri.split("/").pop(),
      type: image.assets[0].mimeType,
    };
    disaptch(infoUserReducer(file));

    const formdata = new FormData();
    formdata.append(
      "name",
      `${responseUseSlt.firstName} ${responseUseSlt.lastName}`
    );
    formdata.append("email", responseUseSlt.email);
    formdata.append("password", responseUseSlt.password);
    formdata.append("phoneNumber", responseUseSlt.tel);
    formdata.append("localisation", "44ggff");
    formdata.append("categories", responseUseSlt.categories);
    formdata.append("interests", responseUseSlt.choixInterest);
    formdata.append("imageUrl", file);
    formdata.append("background", "jjjjj");
    createUser(formdata)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setAuthHeaders(response.data.token);
          console.log(response.data.token)
          AsyncStorage.setItem('tokencode',response.data.token)
          navigation.navigate("verification");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*  */
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
    <Box flex={1} safeArea>
      <Back />
      <Box mt={7} mx={7}>
        <Text w={220} fontFamily={"Poppins-Bold"} fontSize={25}>
          Choix des centres d'intérêt
        </Text>
      </Box>
      <Column w={"full"} flex={1} alignItems={"center"}>
        <Center w={"full"} mt={9}>
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{ width: "80%" }}
          >
            <Box
              py={10}
              mt={10}
              borderRadius={20}
              borderColor={"#C0392B"}
              borderWidth={2}
              bg={"white"}
            >
              <Center>
                <Ionicons name="image-outline" size={24} color="black" />
                <Text fontFamily={"Poppins-Regular"}>
                  Télécharger une photo
                </Text>
              </Center>
              {image?.assets[0].uri && (
                <Box mx={10} my={2}>
                  <Progress
                    size="sm"
                    _filledTrack={{
                      bg: "#C0392B",
                    }}
                    bg={"#C0392B"}
                    mb={4}
                    value={progress}
                  />
                </Box>
              )}
            </Box>
          </TouchableOpacity>
        </Center>
        {/*         {image?.assets[0].uri && (
          <Box my={2}>
            <Image
              alt=""
              source={{ uri: image.assets[0].uri }}
              style={{ width: 300, height: 200 }}
            />
          </Box>
        )} */}
      </Column>
      {image?.assets[0].uri && (
        <Box my={3} mx={8}>
          <Button
            onPress={() => handleRegister()}
            py={5}
            rounded={"3xl"}
            w={"100%"}
            _text={{ color: "white", fontFamily: "PoppinsSemiBold" }}
            borderColor={"#C0392B"}
            bgColor={"#C0392B"}
            my={2}
            /* variant="outline" */
            _pressed={{ bgColor: "#f2d7d4" }}
          >
            Suivant
          </Button>
        </Box>
      )}
      {/* <Center mt={12} px={5}>
        <Button
          w={"100%"}
          _text={{ color: "white", fontFamily: "PoppinsSemiBold" }}
          borderColor={"#FF9900"}
          bgColor={"#FF9900"}
          my={2}
          onPress={() => handleRegister()}
          _pressed={{ bgColor: "#f2d7d4" }}
        >
          Valider
        </Button>
      </Center> */}
    </Box>
  );
};

export default Uploadpictureprofil;

const styles = StyleSheet.create({});
