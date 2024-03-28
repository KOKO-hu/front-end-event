import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useRef } from "react";
import { Box, Pressable, Center, FlatList, Row, Column } from "native-base";
import Back from "../../helper/back";
import { useFonts } from "expo-font";
import UpComing from "../../component/billet/UpComing";
import PastTicket from "../../component/billet/PastTicket";
import ActionBillet from "../../hook/ActionBillet";
import LottieView from "lottie-react-native";

const Billet = () => {
  const {
    tickets,
    handleEndReached,
    loading,
    handleChoiceTicket,
    choiceTicket,
    ticketsPast
  } = ActionBillet();
  const animation = useRef(null);
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
    <Box flex={1}>
      <Row mt={10}>
        <Back />
        <Center
          mr={9}
          flex={1}
          _text={{
            fontFamily: "Poppins-Bold",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Mes Tickets
        </Center>
      </Row>
      <Row p={3}  rounded={'lg'} justifyContent={"space-between"} mx={5}>
        <Pressable
          w={"50%"}
          bgColor={"green"}
          onPress={() => handleChoiceTicket("À vénir")}
        >
          <Box
            w={"100%"}
            bgColor={choiceTicket === "À vénir" ? "#C0392B" : "white"}
            rounded={"lg"}
            p={2}
            _text={{
              textAlign: "center",
              color: choiceTicket === "À vénir" ? "white" : "#C0392B",
              fontFamily: "Poppins-Regular",
            }}
          >
            À vénir
          </Box>
        </Pressable>
        <Pressable
          w={"50%"}
          onPress={() => handleChoiceTicket("Ancien billet")}
        >
          <Box
            w={"100%"}
            bgColor={choiceTicket === "Ancien billet" ? "#C0392B" : "white"}
            p={2}
            _text={{
              textAlign: "center",
              color: choiceTicket === "Ancien billet" ? "white" : "#C0392B",
              fontFamily: "Poppins-Regular",
            }}
          >
            Ancien billet
          </Box>
        </Pressable>
      </Row>
      {/* List billet */}
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
              source={require("../../assets/lotties/eventLoading.json")}
            />
          </Column>
        ) : (
        <>
          {choiceTicket === "À vénir" && (
               <FlatList
               showsHorizontalScrollIndicator={false}
               data={tickets}
               renderItem={({ item }) => <UpComing item={item} />}
               keyExtractor={(item) => item._id.toString()}
               onEndReached={handleEndReached}
             />
          )} 
             {choiceTicket === "Ancien billet" && (
               <FlatList
               showsHorizontalScrollIndicator={false}
               data={ticketsPast}
               renderItem={({ item }) => <PastTicket item={item} />}
               keyExtractor={(item) => item._id.toString()}
               onEndReached={handleEndReached}
             />
          )}
       
        </>
        )}
      </>
      {/*   <UpComing/> */}
    </Box>
  );
};

export default Billet;

const styles = StyleSheet.create({});
