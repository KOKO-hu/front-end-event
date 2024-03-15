import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { Box, Button, Image, Row, Text } from "native-base";
import { Video, ResizeMode } from "expo-av";
import Carousel from "react-native-reanimated-carousel";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { sendEvent } from "../../api/events";
import { useNavigation } from "@react-navigation/native";

const Resume = () => {
  const width = Dimensions.get("window").width;
  const [status, setStatus] = React.useState({});
  const video = React.useRef(null);
  const response = useSelector((state) => state.eventReducer.createEvent);
  const [medias, setMedias] = useState(response?.medias);
const navigation = useNavigation()
  const handleCreateEvent = async () => {
  const data ={
    city:response?.city[0],
    country:response?.country[0],
    district:response?.district === undefined ? "" : response?.district[0],
    prix_de_billet_standart: response?.prix_de_billet_standart,
    prix_de_billet_vip:response?.prix_de_billet_vip,
    nombre_de_billet_vip:response?.nombre_de_billet_vip,
    nombre_de_billet_standart:  response?.nombre_de_billet_standart,
    status:response?.status,
    title: response?.title,
    typeEvent: response?.typeEvent,
    description:response?.description,
    categorie_event:response?.ctgEvent,
    date_fin:response?.dateEnd,
    date_debut: response?.dateStart,
    medias:response?.medias
  }
  console.log(data)
  try {
      const response = await sendEvent(data);
      console.log("success",response?.data);
      navigation.navigate("explore")
    } catch (error) {
      console.log(error.message);
    }
 /*    console.log("format", data); */
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
    <Box>
      <KeyboardAwareScrollView>
        <View >
          <Carousel
            loop
            width={width}
            height={width / 1.5}
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
          {/* detail event */}
          <Row justifyContent={"space-between"} mx={5} alignItems={"center"}>
            <Box m={2}>
              <Text fontSize={"20"} fontFamily={"Poppins-Bold"}>
                {response?.title}
              </Text>
            </Box>
            <Row
              mt={6}
              bgColor={"white"}
              rounded={"xl"}
              p={4}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box>
                {response?.status === "Gratuit" ? (
                  <Text
                    textAlign={"center"}
                    fontFamily={"Poppins-Bold"}
                    fontSize={20}
                  >
                    Gratuit
                  </Text>
                ) : (
                  <Text
                    textAlign={"center"}
                    fontFamily={"Poppins-Bold"}
                    fontSize={20}
                  >
                    {response?.prix_de_billet_standart}€
                  </Text>
                )}
                <Text textAlign={"center"}>Person</Text>
              </Box>
            </Row>
          </Row>
          {/* ville */}
          <Row
            mt={5}
            p={3}
            mx={4}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Row space={3}>
              <Box>
                <MaterialIcons name="location-city" size={24} color="black" />
              </Box>
              <Box>
                <Text fontFamily={"Poppins-Bold"}>Ville :</Text>
              </Box>
            </Row>
            <Box>
              <Text color={"#C0392B"}>{response?.city[0]?.name}</Text>
            </Box>
          </Row>
          {/* country */}
          <Row
            p={3}
            mx={4}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Row space={3}>
              <Box>
                <Ionicons name="location" size={24} color="black" />
              </Box>
              <Box>
                <Text fontFamily={"Poppins-Bold"}>Pays :</Text>
              </Box>
            </Row>
            <Box>
              <Text color={"#C0392B"}>{response?.country[0]?.name}</Text>
            </Box>
          </Row>
          {/* categorie d'event */}

          <Row
            p={3}
            mx={4}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Row space={3}>
              <Box>
                <SimpleLineIcons name="event" size={24} color="black" />
              </Box>
              <Box>
                <Text fontFamily={"Poppins-Bold"}>Catégorie d'évenement :</Text>
              </Box>
            </Row>
            <Box>
              <Text color={"#C0392B"}>{response?.ctgEvent}</Text>
            </Box>
          </Row>
          {/* Nombre de billet */}
          {response?.nombre_de_billet_standart && (
            <Row
              p={3}
              mx={4}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Row space={3}>
                <Box>
                  <Fontisto name="ticket-alt" size={24} color="black" />
                </Box>
                <Box>
                  <Text fontFamily={"Poppins-Bold"}>
                    Nombre de billet standart :
                  </Text>
                </Box>
              </Row>
              <Box>
                <Text color={"#C0392B"}>
                  {response?.nombre_de_billet_standart}
                </Text>
              </Box>
            </Row>
          )}
          {/* Nombre de billet VIP */}
          {response?.nombre_de_billet_standart && (
            <Row
              p={3}
              mx={4}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Row space={3}>
                <Box>
                  <Fontisto name="ticket-alt" size={24} color="black" />
                </Box>
                <Box>
                  <Text fontFamily={"Poppins-Bold"}>
                    Nombre de billet VIP :
                  </Text>
                </Box>
              </Row>
              <Box>
                <Text color={"#C0392B"}>{response?.nombre_de_billet_vip}</Text>
              </Box>
            </Row>
          )}
          {/* tYPE D'evenement */}
          {response?.typeEvent && (
            <Row
              p={3}
              mx={4}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Row space={3}>
                <Box>
                  <MaterialIcons name="event-seat" size={24} color="black" />
                </Box>
                <Box>
                  <Text fontFamily={"Poppins-Bold"}>Type d'évènement :</Text>
                </Box>
              </Row>
              <Box>
                <Text color={"#C0392B"}>{response?.typeEvent}</Text>
              </Box>
            </Row>
          )}
          {/* Date debut */}
          {/*          {response?.dateStart && (
           <Row mx={6} justifyContent={"space-between"} alignItems={"center"}>
           <Row space={3}>
             <Box>
             <MaterialIcons name="location-city" size={24} color="black" />
             </Box>
             <Box>
               <Text fontFamily={"Poppins-Bold"}>Date début :</Text>
             </Box>
           </Row>
           <Box>
             <Text color={"#C0392B"}>{response?.dateStart}</Text>
           </Box>
         </Row>
        )} */}
          {/* Date fin */}
          {/*     {response?.dateEnd && (
           <Row mx={6} justifyContent={"space-between"} alignItems={"center"}>
           <Row space={3}>
             <Box>
             <MaterialIcons name="location-city" size={24} color="black" />
             </Box>
             <Box>
               <Text fontFamily={"Poppins-Bold"}>Date fin :</Text>
             </Box>
           </Row>
           <Box>
             <Text color={"#C0392B"}>{response?.dateEnd}</Text>
           </Box>
         </Row>
        )} */}
          <Box p={3} mx={5}>
            <Text fontFamily={"Poppins-Regular"}>{response?.description}</Text>
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
              onPress={() => handleCreateEvent() /* */}
            >
              Suivant
            </Button>
          </Box>
        </View>
      </KeyboardAwareScrollView>
    </Box>
  );
  /* 
       <Box m={1}>
                    <View style={styles.container}>
                      <Video
                        ref={video}
                        style={styles.video}
                        source={{
                          uri: file?.uri,
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={(status) =>
                          setStatus(() => status)
                        }
                      />
                      <Box position={"absolute"} left={"60%"} top={"8%"}>
                        <TouchableOpacity onPress={()=>handlesDeleteFile(file)}>
                          <Box bgColor={"red.600"} rounded={20} p={2}>
                            <AntDesign name="delete" size={24} color="white" />
                          </Box>
                        </TouchableOpacity>
                      </Box>
                    </View>
                  </Box> */
};

export default Resume;

const styles = StyleSheet.create({
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
