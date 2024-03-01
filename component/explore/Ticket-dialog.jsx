import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Actionsheet, Box, Button, Center, Row, Text } from "native-base";
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TICKET_EVENTS } from "../../helper/Index";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
const TicketDialog = ({ isOpen, onClose }) => {
  const [ticket_check, setTicket_check] = useState(1);
  const choiceTicket = (key) => {
    setTicket_check(key);
  };
  const navigation =useNavigation()
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
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="100%" h={350} px={4}>
          <Center>
            <Text fontSize={"lg"} fontFamily={"Poppins-Bold"}>
              Choix de ticket
            </Text>
          </Center>
          <Row space={6}>
            {/* VIP TICKET */}
            {TICKET_EVENTS.map((ticket, key) => (
              <Box
                my={3}
                borderColor={ticket_check === key ? "#C0392B" : "black"}
                borderWidth={ticket_check === key ? 2 : 1}
                px={5}
                py={3}
                rounded={"xl"}
                w={"45%"}
              >
                <TouchableOpacity onPress={() => choiceTicket(ticket.key)}>
                  <Box  >
                  <MaterialCommunityIcons
                    name="ticket-outline"
                    size={24}
                    color={ticket_check === key ? "#C0392B":"black"}
                  />
                  </Box>
                  <Row
                    justifyContent={"space-between"}
                    space={1}
                    alignItems={"center"}
                  >
                    <Box my={3} >
                      <Text fontFamily={"Poppins-Bold"} fontSize={"md"}>
                        {ticket.title}
                      </Text>
                    </Box>
                    <Box bgColor={"#C0392B"} rounded={"full"}>
                      {ticket_check === key ? (
                        <Feather name="check" size={18} color="white" />
                      ) : (
                        <></>
                      )}
                    </Box>
                  </Row>
                  <Box mb={3}>
                    <Text fontSize={10}>{ticket.label}</Text>
                  </Box>
                  <View style={styles.divider}></View>
                  <Box my={3}>
                    <Center>
                      <Text
                        color={"#C0392B"}
                        fontFamily={"Poppins-Bold"}
                        fontSize={20}
                      >
                        $50
                      </Text>
                    </Center>
                  </Box>
                </TouchableOpacity>
              </Box>
            ))}
          </Row>
          {/* number ticket */}
          <Row my={2} justifyContent={"space-between"} alignItems={'center'} px={2}>
            <Box>
              <Text fontFamily={"Poppins-Bold"} fontSize={16}>Nombre de places</Text>
            </Box>
            <Row space={3}>
             <TouchableOpacity>
             <Box  p={2} >
              <AntDesign name="minus" size={20} color="black" />
              </Box>
             </TouchableOpacity>
              <Box >
                <Text fontSize={20} fontFamily={"Poppins-Regular"}>5</Text>
              </Box>
            <TouchableOpacity>
            <Box bgColor={'#C0392B'} p={2}/* px={3} py={2} */ rounded={'full'}>
              <AntDesign name="plus" size={20} color="white" />
              </Box>
            </TouchableOpacity>
            </Row>
          </Row>
          {/* submit code */}
          <Box /* my={2} */ mb={4}>
            <Button
              py={5}
              rounded={"3xl"}
              w={"100%"}
              _text={{ color: "white", fontFamily: "PoppinsSemiBold" }}
              borderColor={"#C0392B"}
              bgColor={"#C0392B"}
              my={2}
              _pressed={{ bgColor: "#f2d7d4" }}
              onPress={()=>navigation.navigate('paiement')}
            >
             Continue
            </Button>
          </Box>
          {/*       <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: "gray.300",
            }}
          >
            Albums
          </Text> */}
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default TicketDialog;

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1, // Épaisseur de votre diviseur
    borderBottomColor: "black", // Couleur de votre diviseur
    borderStyle: "dotted", // Style pointillé
    width: "100%", // Largeur du diviseur
  },
});
