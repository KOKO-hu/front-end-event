import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Center, Column, Input, Row, Text } from "native-base";
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
import Footer from "../../layout/Footer";
import FilterEvent from "../../hook/FilterEvent";
import LottieView from "lottie-react-native";
import FavorieEvent from "../../hook/FavorieEvent";
const Explore = () => {
  const { handleFilterEvent, events, loading, keyValue } = FilterEvent();
 
  const animation = useRef(null);
  /* event list */

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
      <Box flex={1} mt={5}>
        <Header />
        <View style={{ flex: 1 }}>
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
            <View style={{ height: 40, marginTop: 10 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {CATEGORES_EVENTS.map((event, key) => (
                  <>
                    <TouchableOpacity onPress={() => handleFilterEvent(event)}>
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
            <>
              {loading ? (
                <Column
                  flex={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
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
                  data={events}
                  renderItem={({ item }) => <Event item={item} />}
                  keyExtractor={(item) => item._id.toString()}
                  onEndReached={handleEndReached}
                />
              )}
            </>
          </>
        </View>
      </Box>
      {/* footer */}
      <Footer />
    </>
  );
};

export default Explore;

const styles = StyleSheet.create({});
