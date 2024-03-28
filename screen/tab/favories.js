import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import {
  Box,
  Button,
  Column,
  Divider,
  FlatList,
  Image,
  Row,
  Text,
} from "native-base";
import Back from "../../helper/back";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Favorie from "../../component/explore/Favorie";
import FilterEvent from "../../hook/FilterEvent";
import FilterFavorie from "../../hook/FilterFavorie";
import LottieView from "lottie-react-native";
import Footer from "../../layout/Footer";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ActionFavorie from "../../hook/ActionFavorie";
import { useSelector } from "react-redux";
import FavorieEvent from "../../hook/FavorieEvent";
const Favories = () => {
  const bottomSheetModalRef = useRef(null);
  const animation = useRef(null);
  const { favorie: favorieRemove } = useSelector(
    (state) => state.favorieReducer
  );
  const { favories, keyValue, loading, setFavories } = FilterFavorie();
  const { handleRemoveFavorie } = FavorieEvent();

  /* d */
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  /* fin */
  const handleEndReached = () => {
    // Function to handle reaching the end of the list
    console.log("Reached end of list");
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
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Box flex={1} safeArea>
          <Row>
            <Back />

            <Box mx={2} my={3} flex={1}>
              <Text
                mr={10}
                textAlign={"center"}
                fontFamily={"Poppins-Bold"}
                fontSize={"lg"}
              >
                Favories
              </Text>
            </Box>
          </Row>

          {/* liste favories */}
          <>
            {loading ? (
              <Column flex={1} alignItems={"center"} justifyContent={"center"}>
                <LottieView
                  autoPlay
                  ref={animation}
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "#fffff",
                  }}
                  // Find more Lottie files at https://lottiefiles.com/featured
                  source={require("../../assets/lotties/eventLoading.json")}
                />
              </Column>
            ) : (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={favories}
                renderItem={({ item }) => (
                  <Favorie
                    item={item}
                    bottomSheetModalRef={
                      bottomSheetModalRef
                    } /* updateEvents={updateEvents} */
                  />
                )}
                keyExtractor={(item) => item._id.toString()}
                onEndReached={handleEndReached}
              />
            )}
          </>

          {/*  <Favorie /> */}
        </Box>
        <BottomSheetModalProvider>
          <View style={styles.container}>
            {/*   <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        /> */}
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
            >
              <BottomSheetView style={styles.contentContainer}>
                {/* modal effectuer */}
                <Box>
                  <Text
                    textAlign={"center"}
                    fontSize={20}
                    fontFamily={"Poppins-Bold"}
                  >
                    Supprimer des favoris ?
                  </Text>
                </Box>
                <Divider />
                <Box my={2} bg={"white"} rounded={"md"} mx={4} py={2}>
                  <Row space={3}>
                    <Box mx={2}>
                      <Image
                        rounded={"lg"}
                        source={{
                          uri: favorieRemove?.id_event?.medias[0]?.fileUri,
                        }}
                        alt="Alternate Text"
                        size="xl"
                      />
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
                          <Text
                            fontFamily={"Poppins-Regular"}
                            color={"#C0392B"}
                          >
                            {favorieRemove?.id_event?.categorie_event}
                          </Text>
                        </Box>
                      </Box>
                      <Box mx={2}>
                        <Text fontFamily={"Poppins-Bold"} fontSize={18}>
                          {favorieRemove?.id_event?.title}
                        </Text>
                      </Box>
                      <Row>
                        <Box>
                          <Entypo
                            name="location-pin"
                            size={24}
                            color="#C0392B"
                          />
                        </Box>
                        <Box>
                          <Text>
                            {favorieRemove?.id_event?.city?.name}/
                            {favorieRemove?.id_event?.country?.name}
                          </Text>
                        </Box>
                      </Row>
                      <Box mx={3}>
                        {favorieRemove?.status == "Gratuit" ? (
                          <Text color={"#C0392B"} fontFamily={"Poppins-Bold"}>
                            Gratuit
                          </Text>
                        ) : (
                          <Text color={"#C0392B"} fontFamily={"Poppins-Bold"}>
                            $45/person
                          </Text>
                        )}
                      </Box>
                    </Column>
                  </Row>
                  <Row my={5} space={8}>
                    <Button
                      borderWidth={1}
                      borderColor={"#C0392B"}
                      colorScheme="primary"
                      variant={"Outline"}
                      w={"45%"}
                      onPress={() => {
                        bottomSheetModalRef.current.close();
                      }}
                    >
                      Annuler
                    </Button>
                    <Button
                      bgColor={"#C0392B"}
                      py={4}
                      w={"45%"}
                      onPress={() => {
                        handleRemoveFavorie(favorieRemove?._id);
                        setFavories(
                          favories.filter(
                            (fav) => fav._id !== favorieRemove?._id
                          )
                        );
                        bottomSheetModalRef.current.close();
                      }}
                    >
                      Oui , supprime
                    </Button>
                  </Row>
                </Box>
                {/* fin */}
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <Footer />
    </>
  );
};

export default Favories;

const styles = StyleSheet.create({
  container: {
    elevation: 8,
    borderRadius: 50,
    /*  backgroundColor:"red" */
  },
  contentContainer: {
    marginHorizontal: 30,
  },
  /*   container: {
        flex: 1,
      }, */
});
