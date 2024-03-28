import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { Box, Column, Image, Row } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { formatDate } from "../../helper/Index";
import { useNavigation } from "@react-navigation/native";
const PastTicket = ({item}) => {
  const navigation = useNavigation()
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
    <Box bgColor={"white"} p={2} mx={3} my={2}>
      <Pressable onPress={()=>navigation.navigate('detailBillet',{param:item._id})}>
      <Row>
        <Image
          shadow={2}
          rounded={"lg"}
          source={{
            uri: item.id_event.medias[0].fileUri,
          }}
          alt="Alternate Text"
          size="xl"
        />
        <Column mx={4} space={1}>
          <Box _text={{ fontFamily: "Poppins-Bold" }}>{item?.id_event?.title}</Box>
          <Box _text={{ color: "#C0392B" }}>{formatDate(item?.id_event?.date_fin)}</Box>
          <Row>
            <Row flex={1}>
              <Entypo name="location-pin" size={24} color="black" />
              <Row _text={{ fontFamily: "Poppins-Regular" }} flex={1}>
                <Box>{item?.id_event?.city?.name}</Box>
                <Box>
                  <Text> / </Text>
                </Box>
                <Box>{item?.id_event?.country?.name}</Box>
              </Row>
            </Row>
          </Row>

          <Row alignItems={"center"}>
            <Box>
              <Box
                p={1}
                px={5}
                rounded={"lg"}
                borderWidth={1}
                borderColor={"green.500"}
                _text={{ color: "green.500", fontFamily: "Poppins-Regular", fontSize:10 }}
              >
                Ancien billet
              </Box>
            </Box>
            <Image
              shadow={2}
              ml={5}
              source={{
                uri: item?.qrcode,
              }}
              alt="Alternate Text"
              size="sm"
            />
          </Row>
        </Column>
      </Row>
      </Pressable>
      
    </Box>
  );
};

export default PastTicket;

const styles = StyleSheet.create({});
