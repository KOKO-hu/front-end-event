import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { Box, Button, Column, Image, Radio, Row, Text } from "native-base";
import Back from "../helper/back";
import { useFonts } from "expo-font";

const Paiement = () => {
  const [value, setValue] = React.useState("one");
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
    <Box flex={1} safeArea>
      <Back />
      <Box mx={4} my={2}>
        <Text fontFamily={"Poppins-Bold"} fontSize={20}>
          Méthode de paiement
        </Text>
      </Box>
      <Row>
        <Box mx={4} mt={9}>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
          >
            {/* Paypal */}
            <Row
              bgColor={"white"}
              rounded={16}
              p={4}
              my={2}
              w={"full"}
              justifyContent={"space-between"}
            >
              <Row alignItems={"center"} space={3}>
                <Box>
                  <Image
                    source={require("../assets/paypal.png")}
                    alt="Alternate Text"
                    size="xs"
                  />
                </Box>
                <Box>
                  <Text fontFamily={"Poppins-Regular"}>25244*****</Text>
                </Box>
              </Row>
              <Radio shadow={2} colorScheme="red" value="one" my="2"></Radio>
            </Row>
            {/* carte */}
            <Row
              my={2}
              rounded={16}
              bgColor={"white"}
              p={4}
              w={"full"}
              justifyContent={"space-between"}
            >
              <Row alignItems={"center"} space={3}>
                <Box>
                  <Image
                    source={require("../assets/visa.png")}
                    alt="Alternate Text"
                    size="xs"
                  />
                </Box>
                <Box>
                  <Text fontFamily={"Poppins-Regular"}>25244*****</Text>
                </Box>
              </Row>
              <Radio shadow={2} colorScheme="red" value="two" my="2"></Radio>
            </Row>
            {/* momo */}
            <Row
              my={2}
              rounded={16}
              bgColor={"white"}
              p={4}
              w={"full"}
              justifyContent={"space-between"}
            >
              <Row alignItems={"center"} space={3}>
                <Box>
                  <Image
                    source={require("../assets/momo.png")}
                    alt="Alternate Text"
                    size="xs"
                  />
                </Box>
                <Box>
                  <Text fontFamily={"Poppins-Regular"}>25244*****</Text>
                </Box>
              </Row>
              <Radio shadow={2} colorScheme="red" value="free" my="2"></Radio>
            </Row>
            {/*  <Radio shadow={2} value="two" my="2"></Radio> */}
          </Radio.Group>
        </Box>
      </Row>
      <Column mx={4} justifyContent={"flex-end"} /* my={2} */ mb={4} flex={1}>
        <Button
          py={5}
          rounded={"3xl"}
          w={"100%"}
          _text={{ color: "white", fontFamily: "PoppinsSemiBold" }}
          borderColor={"#C0392B"}
          bgColor={"#C0392B"}
          my={2}
          _pressed={{ bgColor: "#f2d7d4" }}
          /*    onPress={()=>navigation.navigate('paiement')} */
        >
          Continue
        </Button>
      </Column>
    </Box>
  );
};

export default Paiement;

const styles = StyleSheet.create({});
