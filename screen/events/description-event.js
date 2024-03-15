import { Keyboard, StyleSheet, View } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { Box, Button, Row, Text, TextArea } from "native-base";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { createEventReducer } from "../../redux/eventReducer";

const DescriptionEvent = () => {
  const textAreaRef = useRef();
  const [description, setDescription] = useState("");
  const navigation = useNavigation();
const [error, setError]=useState()
const dispatch = useDispatch()
const handleDescription = ()=>{
 /*  console.log("Description") */
  if (description ) {
    navigation.navigate("createTicketEvent")
    dispatch(createEventReducer({description}))
  }else{
    setError("Veuillez renseigner ce champs")
  }

}

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
      <KeyboardAwareScrollView style={{flex:1, }}>
        <Box  flex={1} safeArea>
          <Row my={3} mx={3} mt={5}>
            <Box>
              <Text fontFamily={"Poppins-Regular"} color={"#C0392B"}>
                Annuler
              </Text>
            </Box>
            <Row flex={1} justifyContent={"center"}>
              <Text fontFamily={"Poppins-Bold"}>Description</Text>
            </Row>
          </Row>

          {/* description */}
          <Box p={4}>
            <TextArea
              h={100}
              placeholder="Description de lévènement..."
              w="100%"
              rounded={"2xl"}
              keyboardType="default"
              value={description}
              onSubmitEditing={() => textAreaRef.current.blur()} // for web
              onChangeText={(text) => setDescription(text)}
              _light={{
                placeholderTextColor: "trueGray.700",
                bg: "coolGray.100",
                _hover: {
                  borderColor: "#C0392B",
                },
                _focus: {
                  borderColor: "#C0392B",
                },
              }}
              _dark={{
                bg: "#C0392B",
                _hover: {
                  bg: "#C0392B",
                },
                _focus: {
                  bg: "#C0392B",
                },
              }}
            />
           {error && (
             <Box mx={4}><Text color={"red.600"} fontSize={10}>{error}</Text></Box>
           )}
            <Row justifyContent={"flex-end"}>
              <Text mx={2} my={1} fontFamily="Poppins-Regular">
                {description.length}/300
              </Text>
            </Row>
          </Box>
        </Box>
        {/* submit */}
        <Box my={3} p={4}>
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
            onPress={() => handleDescription()}
          >
            Suivant
          </Button>
        </Box>
      </KeyboardAwareScrollView>
    </>
  );
};

export default DescriptionEvent;

const styles = StyleSheet.create({});
