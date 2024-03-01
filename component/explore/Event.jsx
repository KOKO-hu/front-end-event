import { Pressable, StyleSheet, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { Box, Column, Image, Row, Text } from "native-base";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Event = ({ item }) => {
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
    <Box my={2} elevation={1} mx={6} bg={"white"} rounded={"sm"}>
      <Pressable onPress={()=>navigation.navigate('detailEvent',{params:item._id})}>
  
      <Column space={6}>
        <Image
          rounded={"md"}
          shadow={2}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL_FILE}/${item.medias[0]}`,
          }}
          alt="Alternate Text"
          w={"full"}
          height={"200"}
        />
        <Row justifyContent={"space-between"} px={3}>
          <Column>
            <Box mx={1}>
              <Text fontFamily={"Poppins-Bold"} fontSize={16}>
                {item.title}
              </Text>
            </Box>

            <Row alignItems={'center'}>
              <EvilIcons name="calendar" size={24} color="black" />
              <Box mt={1} mx={1}>
                <Text fontFamily={"Poppins-Regular"}>
                  {item?.date_debut} - {item?.date_fin}
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
          <Box>
            <Text fontSize={"lg"} color={"#C0392B"} fontFamily={"Poppins-Bold"}>
              $50
            </Text>
          </Box>
        </Row>
        <Box position={"absolute"} bottom={"85%"}>
          <Row justifyContent={"flex-end"} width={"full"} px={3}>
            <TouchableOpacity>
              <Box bg={"white"} p={2} rounded={"xl"}>
                <AntDesign
                  name={!item?.favorie ? "hearto" : "heart"}
                  size={24}
                  color={!item?.favorie ? "black" : "#C0392B"}
                />
              </Box>
            </TouchableOpacity>
          </Row>
        </Box>
      </Column>
      </Pressable>
   
    </Box>
  );
};

export default Event;

const styles = StyleSheet.create({});
