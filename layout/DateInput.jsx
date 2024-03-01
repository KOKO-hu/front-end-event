import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Box, Button, HStack,Text, Icon, Row } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Fontisto } from "@expo/vector-icons";
import { useFonts } from "expo-font";
const DateInput = ({date, setDate,title}) => {
  
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
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
    <Box  p={4} >
      <Text fontFamily={"Poppins-Regular"} mx={3} mb={1}>{title}*</Text>
      <Pressable w={"full"} onPress={showDatepicker}>
        <Box py={5} bgColor={"white"}   p={4} rounded={"2xl"}>
          <HStack alignItems="center" ml={2} justifyContent={"space-between"}>
            <Text>{date.toLocaleDateString('fr-FR')}</Text>
            <Fontisto name="date" size={24} color="#C0392B" />
          </HStack>
        </Box>
      </Pressable>
      {show && (
 
         <DateTimePicker
          locale="fr-FR"
          testID="dateTimePicker"
          value={date}
          dateFormat="day month year"
          display="spinner"
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />

      )}
    </Box>
  );
};

export default DateInput;

const styles = StyleSheet.create({});
