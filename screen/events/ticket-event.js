import { StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Box, Button, CheckIcon, Input, Row, Select, Text } from "native-base";
import { useFonts } from "expo-font";
import { STATUS_BILLETS } from "../../helper/Index";

const TicketEvent = () => {
  const [statusBillet, setStatusBillet] = useState("Gratuit");

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
      <Row my={3} mx={3} mt={5}>
        <Box>
          <Text fontFamily={"Poppins-Regular"} color={"#C0392B"}>
            Annuler
          </Text>
        </Box>
        <Row flex={1} justifyContent={"center"}>
          <Text fontFamily={"Poppins-Bold"}>Créaction de ticket</Text>
        </Row>
      </Row>
      {/* type de ticket */}
      <Box p={4}>
        <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
          Statut du Billet *
        </Text>
        <Select
          py={5}
          rounded={"2xl"}
          selectedValue={statusBillet}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "white",
            endIcon: <CheckIcon size="5" />,
          }}
          _light={{
            bg: "white",
            _hover: {
              bg: "#C0392B",
            },
            _focus: {
              bg: "#C0392B",
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
          onValueChange={(itemValue) => setStatusBillet(itemValue)}
        >
          <Select.Item shadow={2} label={"Gratuit"} value={"Gratuit"} />

          <Select.Item shadow={2} label={"Payant"} value={"Payant"} />
        </Select>
      </Box>
      {statusBillet === STATUS_BILLETS[0].status && (
        <>
          {/* TICKET STANDART */}
          <Box my={4}>
            <Box mx={4}>
              <Text px={3} fontFamily={"Poppins-Bold"} fontSize={15}>
                Standart
              </Text>
            </Box>
            <Row w={"100%"}>
              <Box p={4} flex={1}>
                <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
                  Nombre de billet *
                </Text>
                <Input
                  py={5}
                  _focus={{
                    borderColor: "#C0392B",
                  }}
                  rounded={"3xl"}
                  bgColor={"white"}
                  keyboardType="numeric"
                  size="lg"
                  placeholder="Nombre de billet"
                />
              </Box>
              {/* prix de billet */}
              <Box p={4} flex={1}>
                <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
                  Prix billet *
                </Text>
                <Input
                  py={5}
                  _focus={{
                    borderColor: "#C0392B",
                  }}
                  rounded={"3xl"}
                  bgColor={"white"}
                  keyboardType="numeric"
                  size="lg"
                  placeholder="Prix billet"
                />
              </Box>
            </Row>
          </Box>
          {/* vip */}
          <Box my={4}>
            <Box mx={4}>
              <Text px={3} fontFamily={"Poppins-Bold"} fontSize={15}>
                VIP
              </Text>
            </Box>
            <Row w={"100%"}>
              <Box p={4} flex={1}>
                <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
                  Nombre de billet *
                </Text>
                <Input
                  py={5}
                  _focus={{
                    borderColor: "#C0392B",
                  }}
                  rounded={"3xl"}
                  bgColor={"white"}
                  keyboardType="numeric"
                  size="lg"
                  placeholder="Nombre de billet"
                />
              </Box>
              {/* prix de billet */}
              <Box p={4} flex={1}>
                <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
                  Prix billet *
                </Text>
                <Input
                  py={5}
                  _focus={{
                    borderColor: "#C0392B",
                  }}
                  rounded={"3xl"}
                  bgColor={"white"}
                  keyboardType="numeric"
                  size="lg"
                  placeholder="Prix billet"
                />
              </Box>
            </Row>
          </Box>
        </>
      )}
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
         onPress={() => navigation.navigate("createTicketEvent")}
       >
         Suivant
       </Button>
     </Box>
</>
  );
};

export default TicketEvent;

const styles = StyleSheet.create({});
