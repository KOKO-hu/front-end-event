import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Column,
  PresenceTransition,
  Row,
  Text,
} from "native-base";
import { useFonts } from "expo-font";
import { fonts } from "../../assets/fonts/font";
import { useNavigation } from "@react-navigation/native";
import { INTERESTS } from "../../helper/Index";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../api/auth";
import { infoUserReducer } from "../../redux/auth-reducer";
import Back from "../../helper/back";
const Interest = () => {
  const navigation = useNavigation();
  const [interest, setInterest] = useState(INTERESTS);
  const dispatch = useDispatch();
  const [choixInterestCheck, setChoixInterestCheck] = useState([]);
  const { informationUser } = useSelector((state) => state.authReducer);
  const [lenghtInterestCheck, setLenghtInterestCheck] = useState(
    interest.filter((item) => item.check).length || 0
  );
  const scales = INTERESTS.map(() => useSharedValue(1));
  useEffect(() => {
    const checkedCount = interest.filter((item) => item.check).length;
    setLenghtInterestCheck(checkedCount);
  }, [interest]);
  const handlePress = (index, _interest) => {
    scales[index].value = withSpring(1.2, {}, () => {
      scales[index].value = withSpring(1);
    });
    const position = interest.indexOf(_interest);

    const newInterest = interest.map((item, i) => {
      if (i === position) {
        return { ...item, check: !_interest.check };
      }

      return item;
    });

    setInterest(newInterest);
  };
  /* regiser user */
  const handleRegister = async () => {
    const choixInterest = interest.filter((item) => {
      return item.check === true;
    });
    setChoixInterestCheck(choixInterest); //
    dispatch(infoUserReducer({ choixInterest: choixInterest }));
    navigation.navigate("uploadImage");
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
    <>
      <Box flex={1} safeArea>
        <Back />
        <Box mx={4} my={5}>
          <Box>
            <Text fontSize={25} w={225} fontFamily={"Poppins-Bold"}>
              Choix des centres d'intérêt
            </Text>
          </Box>
          <Box>
            <Text fontSize={13} fontFamily={"Poppins-Regular"}>
              Personnalisez Votre Expérience
            </Text>
          </Box>
        </Box>
        <Column  flex={1}>
          <Box>
            <Row flexWrap={"wrap"} mx={3}>
              {interest.map((interest, _i) => (
                <TouchableOpacity
                  key={_i}
                  onPress={() => handlePress(_i, interest)}
                >
                  <Animated.View
                    style={[
                      styles.button,
                      { backgroundColor: interest.check ? "#C0392B" : "white" },
                      useAnimatedStyle(() => ({
                        transform: [{ scale: scales[_i].value }],
                      })),
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { color: interest.check ? "white" : "#C0392B", fontFamily:'Poppins-Regular' },
                      ]}
                    >
                      {interest.label}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              ))}
            </Row>
          </Box>
       
          <Box></Box>
        </Column>
        {lenghtInterestCheck >= 4 && (
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
    /*         <Center mt={12} px={5}>
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
            </Center> */
          )}

      </Box>
    </>
  );
};

export default Interest;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    borderWidth: 1,
    margin: 4,
    backgroundColor: "#C0392B",
    borderColor: "#C0392B",
    padding: 13,
    borderRadius: 70,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
