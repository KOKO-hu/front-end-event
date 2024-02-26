import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Input, Row, Text } from "native-base";
import Header from "../../layout/Header";
import { useFonts } from "expo-font";
import { fonts } from "../../assets/fonts/font";
import Front_page from "../../component/explore/Front_page";
import Categories from "../../component/explore/Categories";
import Event from "../../component/explore/Event";
import { CATEGORES_EVENTS } from "../../helper/Index";
import { allEvent } from "../../api/events";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Explore = () => {
  
  const data = [
    {
      id: "bd75cbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
      avatarUrl:
        "https://img.freepik.com/photos-gratuite/diverses-personnes-dansent-dansent-ensemble-lors-soiree-discotheque-dans-discotheque-jeunes-amis-se-tenant-main-chantant-se-relaxant-piste-danse-bondee-lors-rassemblement-social_482257-67151.jpg?w=996&t=st=1707911326~exp=1707911926~hmac=610ce983a6b0999593448c1d34a8d48b26651c88dfec2150b394e6ca285cf2c7",
    },
  ];
  const data2 = [
    {
      id: "bd7acbdea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
    },
    {
      id: "bd7adcbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
    },
    {
      id: "bd7acfbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
    },
    {
      id: "bd7acbeya-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
    },
  ];
  const [events, setEvents] = useState([]);
  const [keyValue, setKeyValue] = useState(0);
  const choice = (valeur) => {
    setKeyValue(valeur);
  };
  /* event list */
  useEffect(() => {
    allEvent({ page: 1, limit: 8, category: "" })
      .then((events) => {
        setEvents(events.data)
        console.log("events dezs d is", events);
      })
      .then((error) => {
        console.log("events error", error);
      });
  }, []);
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
    <Box flex={1} safeArea>
      <Header />
      <View style={{ flex: 1 }}>
        {/*   <ScrollView showsHorizontalScrollIndicator={false}>
   
        </ScrollView> */}

        <>
          <Box mx={4} my={2}>
            <Text fontSize={15} fontFamily={"Poppins-Bold"}>
              <Text color={"#C0392B"}>Découvrez</Text> des évènements
              incroyables !
            </Text>
          </Box>
          <Box px={3} py={2}>
            <Input
              py={3}
              _focus={{
                borderColor: "#C0392B",
              }}
              _input={{ fontFamily: "Poppins-Regular" }}
              rounded={"3xl"}
              bgColor={"white"}
              keyboardType="default"
              rightElement={
                <Box px={2}>
                  <Octicons name="search" size={24} color="black" />
                </Box>
              }
              size="lg"
              placeholder="Rechercher un evènement..."
            />
          </Box>
          {/*    <Row mx={4} my={3} justifyContent={"space-between"}>
                <Text
                  color={"#C0392B"}
                  fontSize={15}
                  fontFamily={"Poppins-Bold"}
                >
                  A la une
                </Text>
                <Text
                  color={"#C0392B"}
                  fontFamily={"Poppins-Regular"}
                  fontSize={14}
                >
                  Voir tout
                </Text>
              </Row> */}
          {/*      <View style={{ height: 200 }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <Front_page item={data[0]} />
                  <Front_page item={data[0]} />
                </ScrollView>
              </View> */}
          <View style={{ height: 40, marginTop: 10 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {CATEGORES_EVENTS.map((event, key) => (
                <>
                  <TouchableOpacity onPress={() => choice(event.key)}>
                    <Box
                      ml={4}
                      key={key}
                      bgColor={keyValue === key ? "#C0392B" : null}
                      p={2}
                      px={3}
                      rounded={keyValue === key ? "2xl" : null}
                    >
                      <Text
                        color={keyValue === key ? "white" : "#C0392B"}
                        fontSize={14}
                        fontFamily={"Poppins-Bold"}
                      >
                        {event.label}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                </>
              ))}
            </ScrollView>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={events}
            renderItem={({ item }) => <Event item={item} />}
            keyExtractor={(item) => item._id.toString()}
            onEndReached={handleEndReached}
          />

        </>
      </View>
    </Box>
  );
};

export default Explore;

const styles = StyleSheet.create({});
