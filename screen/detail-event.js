import { StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Column,
  Text,
  Image,
  Row,
  ScrollView,
  Button,
  Skeleton,
  useDisclose,
  Actionsheet,
} from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import { eventById } from "../api/events";
import { Video, ResizeMode } from "expo-av";
import TicketDialog from "../component/explore/Ticket-dialog";
import Carousel from "react-native-reanimated-carousel";
import { formatDate } from "../helper/Index";

const DetailEvent = () => {
  const route = useRoute();
  const width = Dimensions.get("window").width;
  const [detailEvent, setDetailEvent] = useState();
  const [loading, setLoading] = useState(false);
  const [medias, setMedias] = useState([]);
  const { params } = route.params;
  const video = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclose();
  /*  console.log("Ticket", params); */
  /*   const coordinates = {
    latitude: 37.78825,
    longitude: -122.4324,
  }; */
  useEffect(() => {
    eventById(params)
      .then((response) => {
        console.log(response.data);
        setDetailEvent(response.data);
        setMedias(response.data.medias);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  }, []);
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
        <ScrollView>
          <Box>
            <Skeleton h="400" px={4} w={"100%"} isLoaded={loading}>
              <Carousel
                loop
                width={width}
                height={width / 1.2}
                autoPlay={false}
                data={medias}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log("current index:", index)}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flex: 1,
                      marginTop: 30,
                      justifyContent: "center",
                    }}
                  >
                    <>
                      {item?.fileType === "image" ? (
                        <Box m={1}>
                          <Image
                            rounded={"md"}
                            source={{
                              uri: item.fileUri,
                            }}
                            resizeMode="cover"
                            alt="Alternate Text"
                            /*  size="xl" */
                            h={"100%"}
                            w={"100%"}
                          />
                        </Box>
                      ) : (
                        <Box m={1}>
                          <View style={styles.container}>
                            <Video
                              ref={video}
                              style={styles.video}
                              source={{
                                uri: item?.fileUri,
                              }}
                              useNativeControls
                              resizeMode={ResizeMode.CONTAIN}
                              isLooping
                              onPlaybackStatusUpdate={(status) =>
                                setStatus(() => status)
                              }
                            />
                          </View>
                        </Box>
                      )}
                    </>
                    {/* 
                    <Text style={{ textAlign: 'center', fontSize: 30 }}>
                        {item.uri}
                    </Text> */}
                  </View>
                )}
              />
              {/*     <Image
                rounded={"md"}
                shadow={2}
                source={{
                  uri: "https://img.freepik.com/photos-gratuite/vue-arriere-foule-fans-regardant-performances-direct-concert-musique-nuit-espace-copie_637285-544.jpg?t=st=1708613454~exp=1708617054~hmac=f9e7937f022e4013f7bb86c1991393d816f494bce8353b2d8d543fb2f624d1da&w=1060",
                }}
                alt="Alternate Text"
                w={"full"}
                height={"300"}
              /> */}
            </Skeleton>
          </Box>
          {/* detail event */}

          <Skeleton
            isLoaded={loading}
            p={3}
            h={"100"}
            rounded={"3xl"}
            mx={2}
            my={2}
          >
            <Row p={3} bgColor={"white"} rounded={"3xl"} mx={2} my={2}>
              <Column flex={1}>
                <Text fontSize={20} fontFamily={"Poppins-Bold"}>
                  {detailEvent?.title}
                </Text>
                <Row alignItems={"center"}>
                  <EvilIcons name="calendar" size={24} color="black" />
                  <Box mt={1} mx={1}>
                    <Text fontFamily={"Poppins-Regular"}>
                      {formatDate(detailEvent?.date_fin)}
                    </Text>
                  </Box>
                </Row>
                <Row my={1} /* bgColor={'#c0392b8a'}  */>
                  <Box>
                    <EvilIcons name="location" size={24} color="#c0392b8a" />
                  </Box>
                  <Text
                    mx={1}
                    fontFamily={"Poppins-Regular"}
                    color={"#c0392b8a"}
                  >
                    {detailEvent?.country?.name} {detailEvent?.city?.name}
                    {/* Londre loin */}
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
                    {detailEvent?.status === "Gratuit" ? (
                      <>{detailEvent?.status}</>
                    ) : (
                      <>${detailEvent?.prix_de_billet_standart}</>
                    )}
                  </Text>
                </Box>
                <Box>
                  <Text fontFamily={"Poppins-Regular"} fontSize={"10"}>
                    {detailEvent?.status === "Gratuit" ? (
                      <>
                        <Box _text={{ fontFamily: "Poppins-Regular" }}>
                          0 tickets disponibles
                        </Box>
                      </>
                    ) : (
                      <>
                        <Text fontFamily={"Poppins-Regular"}>
                          ${detailEvent?.nombre_de_billet_standart} tickets
                          disponibles
                        </Text>
                      </>
                    )}
                  </Text>
                </Box>
              </Column>
            </Row>
          </Skeleton>
          <Skeleton
            isLoaded={loading}
            pb={9}
            p={3}
            h={"200"}
            rounded={"3xl"}
            mx={2}
            my={2}
          >
            <Column
              pb={9}
              p={3}
              bgColor={"white"}
              rounded={"3xl"}
              mx={2}
              my={2}
            >
              <Box>
                <Text fontFamily={"Poppins-Bold"}>A propos de l'evènement</Text>
              </Box>
              <Box my={1}>
                <Text fontFamily={"Poppins-Regular"}>
                  {detailEvent?.description}
                </Text>
              </Box>
              <Box my={2}>
                <Text fontFamily={"Poppins-Bold"}>Localisation</Text>
              </Box>
              <Box style={styles.mapContainer}>
                {detailEvent?.city && (
                  <MapView
                    style={styles.map}
                    camera={{
                      center: {
                        latitude: detailEvent?.city?.latitude,
                        longitude: detailEvent?.city?.longitude,
                      },
                      pitch: 0,
                      heading: 0,
                      altitude: 1000,
                      zoom: 0,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: detailEvent?.city?.latitude,
                        longitude: detailEvent?.city?.longitude,
                      }}
                      title="Marquer ici"
                    />
                  </MapView>
                )}
              </Box>
            </Column>
          </Skeleton>
        </ScrollView>
      </Column>
      <Row
        justifyContent={"space-between"}
        bgColor={"white"}
        px={2}
        mb={3}
        alignItems={"center"}
      >
        <Button
          py={5}
          rounded={"3xl"}
          w={"80%"}
          _text={{ color: "white", fontFamily: "Poppins-Bold" }}
          borderColor={"#C0392B"}
          bgColor={"#C0392B"}
          my={2}
          onPress={onOpen}
          /* variant="outline" */
          _pressed={{ bgColor: "#f2d7d4" }}
          /*          onPress={() => navigation.navigate("login")} */
        >
          Acheter ticket
        </Button>
        <TouchableOpacity>
          <Box bg={"white"} p={2} rounded={"xl"}>
            <AntDesign
              name={!detailEvent?.favorie ? "hearto" : "heart"}
              size={34}
              color={!detailEvent?.favorie ? "black" : "#C0392B"}
            />
          </Box>
        </TouchableOpacity>
      </Row>
      {/* modal ticlket */}

      <TicketDialog isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default DetailEvent;

const styles = StyleSheet.create({
  mapContainer: {
    height: 100, // ou une autre valeur appropriée en pixels ou en pourcentage
    overflow: "hidden", // pour empêcher le contenu de déborder
  },
  map: {
    width: "100%",
    height: "100%",
  },
  container: {
    backgroundColor: "#ecf0f1",

    /*     justifyContent: "center",
   , */
  },
  video: {
    borderRadius: "10",
    /*   alignSelf: "center", */
    width: "100%",
    height: "100%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
