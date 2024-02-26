import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { Box, Column, Text, Image, Row, ScrollView, Button } from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import MapView from "react-native-maps";
const DetailEvent = () => {
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
    <Box flex={1}>
   
    <Column flex={1}>
    <ScrollView  >
        <Box>
          <Image
            rounded={"md"}
            shadow={2}
            source={{
              uri: "https://img.freepik.com/photos-gratuite/vue-arriere-foule-fans-regardant-performances-direct-concert-musique-nuit-espace-copie_637285-544.jpg?t=st=1708613454~exp=1708617054~hmac=f9e7937f022e4013f7bb86c1991393d816f494bce8353b2d8d543fb2f624d1da&w=1060",
            }}
            alt="Alternate Text"
            w={"full"}
            height={"300"}
          />
        </Box>
        {/* detail event */}
     
          <Row p={3} bgColor={"white"} rounded={"3xl"} mx={2} my={2}>
            <Column flex={1}>
              <Text fontSize={20} fontFamily={"Poppins-Bold"}>
                welolove concert
              </Text>
              <Row alignItems={"center"}>
                <EvilIcons name="calendar" size={24} color="black" />
                <Box mt={1} mx={1}>
                  <Text fontFamily={"Poppins-Regular"}>
                    11/11/50225 - 12/5/1101
                  </Text>
                </Box>
              </Row>
              <Row my={1} /* bgColor={'#c0392b8a'}  */>
                <Box>
                  <EvilIcons name="location" size={24} color="#c0392b8a" />
                </Box>
                <Text mx={1} fontFamily={"Poppins-Regular"} color={"#c0392b8a"}>
                  Londre loin
                </Text>
              </Row>
            </Column>
            <Column
              w={100}
              rounded={"3xl"}
              p={2}
              alignItems={"center"}
              bgColor={"#3d3d4e24"}
              justifyContent={"center"}
            >
              <Box>
                <Text fontFamily={"Poppins-Bold"} fontSize={20}>
                  45$
                </Text>
              </Box>
              <Box>
                <Text fontFamily={"Poppins-Regular"} fontSize={"10"}>
                  256 tickets disponibles
                </Text>
              </Box>
            </Column>
          </Row>
          <Column pb={9} p={3} bgColor={"white"} rounded={"3xl"} mx={2} my={2}>
            <Box>
              <Text fontFamily={"Poppins-Bold"}>A propos de l'evènement</Text>
            </Box>
            <Box my={1}>
              <Text fontFamily={"Poppins-Regular"}>
                lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem
                lorem lorem loremlorem
              </Text>
            </Box>
            <Box my={2}>
              <Text fontFamily={"Poppins-Bold"}>Localisation</Text>
            </Box>
            <Box style={styles.mapContainer}>
              <MapView style={styles.map} />
            </Box>
          </Column>
      
        </ScrollView>
      </Column>

    <Row justifyContent={'space-between'} bgColor={'white'} px={2} mb={3}  alignItems={'center'}>
    <Button
              py={5}
              rounded={"3xl"}
              w={"80%"}
              _text={{ color: "white", fontFamily: "Poppins-Bold" }}
              borderColor={"#C0392B"}
              bgColor={"#C0392B"}
              my={2}
              /* variant="outline" */
              _pressed={{ bgColor: "#f2d7d4" }}
              /*          onPress={() => navigation.navigate("login")} */
            >
              Acheter ticket
            </Button> 
            <TouchableOpacity>
              <Box bg={"white"} p={2} rounded={"xl"}>
                <AntDesign
                  name={/* !item?.favorie ? "hearto" : */ "heart"}
                  size={34}
                  color={/* !item?.favorie ? "black" : */ "#C0392B"}
                />
              </Box>
            </TouchableOpacity>
    </Row>
    </Box>
  );
};

export default DetailEvent;

const styles = StyleSheet.create({
    mapContainer: {
        height: 100, // ou une autre valeur appropriée en pixels ou en pourcentage
        overflow: 'hidden', // pour empêcher le contenu de déborder
      },
  map: {
    width: "100%",
    height: "100%", 
  },
});
