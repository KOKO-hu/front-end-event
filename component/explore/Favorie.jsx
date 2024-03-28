import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { Box, Button, Column, Image, Row, Text } from "native-base";
import Back from "../../helper/back";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ActionFavorie from "../../hook/ActionFavorie";
import { useDispatch, useSelector } from "react-redux";
import { favorieItemReducer } from "../../redux/favorie-reducer";
const Favorie = ({ item, bottomSheetModalRef }) => {
  const {handleRemoveFavorie,favorieRemove}=ActionFavorie()
 
  const dispatch = useDispatch()
/*   console.log("dedfesfd",favorie) */
  
  const handlePresentModalPress = useCallback((item) => {
    dispatch(favorieItemReducer(item))
    console.log("Layout root",item) 
    handleRemoveFavorie(item)
    bottomSheetModalRef.current?.present();
  }, [handleRemoveFavorie,item,favorieRemove]);

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
      <TouchableOpacity onPress={() => handlePresentModalPress(item)}>
        <Box
          my={2}
          bg={"white"}
          rounded={"md"}
          mx={4}
          py={2}
          elevation={1}
          shadow={1}
        >
          <Row space={3}>
            <Box mx={2}>
              <Image
                rounded={"lg"}
                source={{
                  uri: item?.id_event?.medias[0]?.fileUri,
                }}
                alt="Alternate Text"
                size="xl"
              />
              <Box position={"absolute"} bottom={"60%"}>
                <Row justifyContent={"flex-end"} width={"full"} px={3}>
                  <TouchableOpacity
                  /*       disabled={item?.favorie}
            onPress={() => {
              if (!item?.favorie) {
                handleAddFavorie(item);
              }
              updateEvents(item);
            }} */
                  >
                    <Box bg={"white"} p={2} rounded={"full"}>
                      <AntDesign
                        name={!item?.id_event?.favorie ? "hearto" : "heart"}
                        size={24}
                        /* color={"#C0392B"} */
                        color={!item?.id_event?.favorie ? "black" : "#C0392B"}
                      />
                    </Box>
                  </TouchableOpacity>
                </Row>
              </Box>
            </Box>
            <Column space={1}>
              <Box>
                <Box
                  rounded={"full"}
                  bg={"#f0bcb6"}
                  minWidth={10}
                  maxWidth={20}
                  p={2}

                  /*    overflow={"hidden"} */
                  /*  p={2} */
                >
                  <Text fontFamily={"Poppins-Regular"} color={"#C0392B"}>
                    {item?.id_event?.categorie_event}
                  </Text>
                </Box>
              </Box>
              <Box mx={2}>
                <Text fontFamily={"Poppins-Bold"} fontSize={18}>
                  {item?.id_event?.title}
                </Text>
              </Box>
              <Row>
                <Box>
                  <Entypo name="location-pin" size={24} color="#C0392B" />
                </Box>
                <Box>
                  <Text>
                    {item?.id_event?.city?.name}/{item?.id_event?.country?.name}
                  </Text>
                </Box>
              </Row>
              <Box mx={3}>

                <Text color={"#C0392B"} fontFamily={"Poppins-Bold"}>
                  $45/person
                </Text>
              </Box>
            </Column>
          </Row>
        </Box>
      </TouchableOpacity>
    </>
  );
};

export default Favorie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
