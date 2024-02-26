import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { Box, Image, Text, Row } from "native-base";
import { fonts } from "../../assets/fonts/font";
import { useFonts } from "expo-font";
import { FontAwesome6 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const Front_page = ({ item }) => {
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
    <Box mx={3} w={80}>
      <Image
        borderTopRadius={10}
        source={{ uri: item.avatarUrl }}
        alt=""
        size={"xl"}
        w={"full"}
        /*   height={"1/5"} */
        resizeMode="cover"
      />

      <Row
        bgColor={"#C0392B"}
        borderBottomRadius={10}
        /*   width={"6/6"} */
        p={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Box>
            <Text
              fontFamily={"Poppins-Bold"}
              color={"white"}
              fontWeight={"bold"}
              fontSize={12}
            >
              Concert WELOVEEYA{" "}
            </Text>
          </Box>
          <Row space={1} my={2}>
            <FontAwesome6 name="location-dot" size={12} color="white" />
            <Text color={"white"} fontFamily={"Poppins-Bold"} fontSize={9}>
              Cotonou
            </Text>
          </Row>
        </Box>
        <TouchableOpacity>
          <Box bgColor={"white"}>
            <Text
              color={"#C0392B"}
              textAlign={"center"}
              fontFamily={"Poppins-Bold"}
              p={2}
            >
              Réservez{" "}
            </Text>
          </Box>
        </TouchableOpacity>
      </Row>
      <Row
        px={4}
        w={"full"}
        justifyContent={"space-between"}
        position={"absolute"}
        bottom={"50%"}
      >
        <Box bgColor={"#FF9900"} p={4} borderRadius={12} px={6}>
          <Text fontSize={"23"} fontFamily={"Poppins-Bold"} color={"white"}>
            12
          </Text>
          <Text fontFamily={"Poppins-Bold"}>FEV</Text>
        </Box>
        <Box p={2} h={10}>
          <FontAwesome name="bookmark" size={28} color="black" />
        </Box>
      </Row>
    </Box>
  );
};

export default Front_page;

const styles = StyleSheet.create({});
