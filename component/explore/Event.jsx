import {
  Pressable,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { Box, Column, Image, Row, Text } from "native-base";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "../../helper/Index";
import FavorieEvent from "../../hook/FavorieEvent";
const Event = ({ item, updateEvents }) => {
  const { handleAddFavorie, handleRemoveFavorie } = FavorieEvent();
  const navigation = useNavigation();

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
    <Box my={2} elevation={1} shadow={1} mx={6} bg={"white"} rounded={"sm"}>
      <Pressable
        onPress={() => navigation.navigate("detailEvent", { params: item._id })}
      >
        <Column space={6}>
          <Image
            rounded={"md"}
            shadow={2}
            source={{
              uri: `${item.medias[0]?.fileUri}`,
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

              <Row alignItems={"center"}>
                <EvilIcons name="calendar" size={24} color="black" />
                <Box mt={1} mx={1}>
                  <Text fontFamily={"Poppins-Regular"}>
                    {formatDate(item?.date_debut)} -{" "}
                    {formatDate(item?.date_fin)}
                  </Text>
                </Box>
              </Row>
              <Row my={1}>
                <Box>
                  <EvilIcons name="location" size={24} color="#c0392b8a" />
                </Box>
                <Text mx={1} fontFamily={"Poppins-Regular"} color={"#c0392b8a"}>
                  {item?.city?.name}
                </Text>
              </Row>
              <Text mx={6} fontFamily={"Poppins-Bold"} color={"#C0392B"}>
                {item?.categorie_event}
              </Text>
            </Column>
            <TouchableOpacity /* onPress={()=>{}} */>
              {item?.status === "Gratuit" ? (
                <Text
                  fontSize={"lg"}
                  color={"#C0392B"}
                  fontFamily={"Poppins-Bold"}
                >
                  Gratuit
                </Text>
              ) : (
                <Text
                  fontSize={"lg"}
                  color={"#C0392B"}
                  fontFamily={"Poppins-Bold"}
                >
                  ${item?.prix_de_billet_standart}
                </Text>
              )}
            </TouchableOpacity>
          </Row>
          <Box position={"absolute"} bottom={"85%"}>
            <Row justifyContent={"flex-end"} width={"full"} px={3}>
              <TouchableOpacity
              disabled={item?.favorie}
                onPress={() => {
                  if (!item?.favorie) {
                    handleAddFavorie(item);
                  }
                  updateEvents(item);
                }}
              >
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
