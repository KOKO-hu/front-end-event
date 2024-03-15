import { StyleSheet, TouchableOpacityBase, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import Back from "../../helper/back";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { fonts } from "../../assets/fonts/font";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Box, Button, Center, Pressable, Text } from "native-base";
import { getCodeAuth, sendCodeAuth } from "../../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/auth-context";

const CodeVerify = () => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });



  const handleRegister = async () => {
    const token = await AsyncStorage.getItem('tokencode')
     authCtx.authentificate(token) 
   
  };
  /* envoie du code */
  const handleCode = () => {
    sendCodeAuth()
      .then((codeAuth) => {
        const code_strg = codeAuth.data.user.code.toString()
         setValue(code_strg) 
      })
      .catch((error) => {
        console.log(error);
      });
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
    <Box safeArea flex={1}>
      <Center mt={10}>
        <Box w={80} rounded={"xl"} p={3}>
          <Text
            textAlign={"center"}
            fontSize={"lg"}
            color={"#AC4439"}
            fontFamily={"Poppins-Bold"}
          >
            Vérifier votre compte
          </Text>
        </Box>
      </Center>
      <Box my={7}>
        <Text textAlign={"center"} fontFamily={"Poppins-Regular"}>
          Veuillez saisir le code de vérification que nous avons envoyé à votre
          numéro : 455566
        </Text>

        <Pressable onPress={()=>handleCode()}>
        <Box mt={4}>
          <Text textAlign={'center'} fontFamily={"Poppins-Regular"} color={"#AC4439"} fontSize={15}>
            Renvoyez le code ?
          </Text>
        </Box>
        </Pressable>
      </Box>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <Box my={9} mx={8}>
        <Button
          onPress={() => handleRegister()}
          py={5}
          rounded={"3xl"}
          w={"100%"}
          _text={{ color: "white", fontFamily: "Poppins-Regular" }}
          borderColor={"#C0392B"}
          bgColor={"#C0392B"}
          my={2}
          /* variant="outline" */
          _pressed={{ bgColor: "#f2d7d4" }}
        >
          Vérifier le code
        </Button>
      </Box>
    </Box>
  );
};

export default CodeVerify;

const styles = StyleSheet.create({
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: "center", fontSize: 20 },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: "auto",
    marginRight: "auto",
  },
  cellRoot: {
    width: 60,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  cellText: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: "#C0392B",
    borderBottomWidth: 2,
  },
});
