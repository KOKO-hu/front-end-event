import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Text,
  Center,
  Column,
  Divider,
  Image,
  Row,
  Skeleton,
} from "native-base";
import { useFonts } from "expo-font";
import ActionBillet from "../hook/ActionBillet";
import { detailTicketByUser } from "../api/billet";
import { formatDate } from "../helper/Index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DetailTicket = ({ route }) => {
  const { param } = route.params;
  const [loading, setLoading] = useState(false);
  const [detailBillet, setDetailBillet] = useState();
  /* console.log('params',response) */
  /*   const { handleDetailTicket } = ActionBillet(); */
  useEffect(() => {
    if (param) {
      const handleDetailTicket = async () => {
        try {
          const response = await detailTicketByUser({ id: param });
          console.log("detail  ticket", response.data.ticket);
          setDetailBillet(response.data.ticket);
          setLoading(true);
        } catch (error) {
          console.log(error);
        }
      };
      handleDetailTicket({ id: param });
    }
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
    <KeyboardAwareScrollView style={{flex:1}}>
  <Column
      justifyContent={"space-between"}
      flex={1}
      p={4}
      my={9}
      mx={4}
      rounded={"sm"}
      bgColor={"white"}
    >
      <Skeleton isLoaded={loading} h={100}>
        <Box>
          <Image
            shadow={2}
            source={{
              uri: detailBillet?.id_event?.medias[0].fileUri,
            }}
            alt="Alternate Text"
            size="2xl"
            w={"full"}
          />
        </Box>
      </Skeleton>

      <Skeleton isLoaded={loading}>
        <Box _text={{ fontFamily: "Poppins-Bold", fontSize: "2xl" }}>
          {detailBillet?.id_event?.title}
        </Box>
      </Skeleton>
      <Skeleton h={20} isLoaded={loading}>
        <Row justifyContent={"space-between"}>
          <Column>
            <Box _text={{ fontFamily: "Poppins-Bold" }}>Nom</Box>
            <Box _text={{ fontFamily: "Poppins-Regular", color: "#a3a3a3" }}>
              {detailBillet?.id_user?.name}
            </Box>
          </Column>
          <Column>
            <Box _text={{ textAlign: "right", fontFamily: "Poppins-Bold" }}>
              Siège
            </Box>
            <Box _text={{ color: "#a3a3a3" }}>5f8dSD</Box>
          </Column>
        </Row>
        <Row justifyContent={"space-between"} alignItems={"center"}>
          <Column>
            <Box _text={{ fontFamily: "Poppins-Bold" }}>L'heure</Box>
            <Box _text={{ color: "#a3a3a3" }}>11h 30 pm</Box>
          </Column>
          <Column>
            <Box _text={{ textAlign: "right", fontFamily: "Poppins-Bold" }}>
              Date
            </Box>
            <Box _text={{ color: "#a3a3a3" }}>
              {formatDate(detailBillet?.id_event?.date_fin)}
            </Box>
          </Column>
        </Row>
     <Row justifyContent={"space-between"} alignItems={"center"}>
     <Column>
          <Box _text={{ fontFamily: "Poppins-Bold", }}>adresse</Box>
          <Row _text={{ color: "#a3a3a3" }} space={2}>
            <Box>{detailBillet?.id_event?.country?.name}</Box>
            <Box>{detailBillet?.id_event?.city?.name}</Box>
          </Row>
        </Column>
        <Column>
          <Box _text={{ fontFamily: "Poppins-Bold",textAlign: "right" }}>STATUS</Box>
      {/*       <Box _text={{textAlign:"center"}}>VIP</Box> */}
       <Center>
       <Image size={"xs"} source={require('../assets/vip_7186453.png')}/>
       </Center>
        </Column>
     </Row>
      </Skeleton>
      <Divider
        my="2"
        /* _light={{
        bg: "muted.500"
      }} */ _dark={{
          bg: "muted.50",
        }}
        borderStyle="dashed"
        borderDashArray={[10, 15]}
      />
      <Row px={2} space={3} alignItems={"center"}>
        <Skeleton w={"40%"} isLoaded={loading}>
          <Column>
            <Box w={"70%"} _text={{ color: "#a3a3a3" }}>
              Fait Scanner votre Qrcode lors de l'entré ou telechargé votre
              qrcode{" "}
            </Box>
          </Column>
        </Skeleton>
        <Skeleton size={40} h={40} isLoaded={loading}>
          <Box>
            <Image
              shadow={2}
              source={{
                uri: detailBillet?.qrcode,
              }}
              alt="Alternate Text"
              size="lg"
            />
          </Box>
        </Skeleton>
      </Row>
      <Skeleton isLoaded={loading}>
        <Box _text={{ fontFamily: "Poppins-Bold" }}>
          Ticket ID : {detailBillet?._id}
        </Box>
      </Skeleton>
      <Center my={3} bgColor={"#c2fce7"} py={3} rounded={"md"}>
        <Text color="green.600" fontFamily={"Poppins-Bold"}>
          Télécharger le ticket
        </Text>
      </Center>
    </Column>
    </KeyboardAwareScrollView>
  
  );
};

export default DetailTicket;

const styles = StyleSheet.create({});
