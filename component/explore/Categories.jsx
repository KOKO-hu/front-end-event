import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import { fonts } from "../../assets/fonts/font";
import { Box, Divider, Text } from "native-base";

const Categories = ({ event, key }) => {
  const [keyValue, setKeyValue] = useState();
  const choice = (valeur) => {
    console.log(key)
    setKeyValue(valeur);
  };

  /* fonts */
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
    <TouchableOpacity onPress={() => choice(event.key)}>
      <Box
        ml={4}
        key={key}
        bgColor={keyValue === key ? "#C0392B" : null}
        p={2}
        rounded={"2xl"}
      >
        <Text color={keyValue === key ? "white" :"#C0392B"} fontSize={14} fontFamily={"Poppins-Bold"}>
          {event.label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Categories;

const styles = StyleSheet.create({});
