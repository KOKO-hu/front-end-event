import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { Box, Button, Center, Column, Container, Text } from "native-base";
import { useFonts } from "expo-font";
import { DATA } from "../helper/Index";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { fonts } from "../assets/fonts/font";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
const Home = () => {
  const buttonScale = useSharedValue(1);

  const handleAnimation = () => {
    buttonScale.value = withTiming(
      1.1,
      { duration: 300, easing: Easing.inOut(Easing.ease) },
      () => {
        buttonScale.value = withTiming(1, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
      }
    );
  };
  useEffect(() => {
    handleAnimation();
  }, []);
  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });
  SplashScreen.preventAutoHideAsync();
  const navigation = useNavigation();
  const { height, width } = Dimensions.get("screen");
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
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ImageBackground
        source={require("../assets/home/belle-photo-couple-pendant-concert.jpg")}
        style={styles.imageBackground}
      >
        <LinearGradient
          style={{ flex: 1 }}
          colors={[
            "rgba(29, 28, 36, 0)",
            "rgba(29, 28, 36, 0.6)",
            "rgba(29, 28, 36, 1.6)", // Noir avec une opacité de 0.8 en bas
            "rgba(29, 28, 36, 2.9)",
          ]}
        >
          <Column justifyContent={"flex-end"} flex={1}>
         {/*    <Animated.View style={[styles.buttonContainer, buttonStyle]}>
              <TouchableOpacity onPress={handleAnimation}>
                <Text style={styles.buttonText}>Mon Bouton</Text>
              </TouchableOpacity>
            </Animated.View> */}
            <Text
              fontSize={"xl"}
              textAlign={"center"}
              color={"white"}
              fontWeight={"bold"}
            >
              <Text fontFamily={"Poppins-Regular"}>Bienvenue sur</Text>
              <Text
                color={"#C0392B"}
                fontSize={"3xl"}
                fontFamily={"Poppins-Bold"}
              >
                {""} KokoEvent
              </Text>
            </Text>
            <Text
              my={2}
              p={1}
              /*     fontFamily={"PoppinsMedium"} */
              textAlign={"center"}
              color={"white"}
              fontSize={"11"}
              fontFamily={"Poppins-Regular"}
            >
              Trouvez des concerts, créez des moments. Avec KokoEvent, réservez
              vos billets pour des expériences musicales uniques. Organisez des
              événements publics ou privés et partagez la musique avec vos
              proches.
            </Text>
            <Center mb={5}>
              <Animated.View style={[styles.buttonContainer, buttonStyle]}>
                <Button
            
                  my={4}
                  py={5}
                  rounded={"3xl"}
                  bgColor={"#C0392B"}
                  onPress={() => console.log("hello world")}
                  _text={{
                    fontFamily: "Poppins-Bold",
                    fontSize: "16",
                  }}
                >
                  Inscription
                </Button>
              </Animated.View>
              <Animated.View style={[styles.buttonContainer, buttonStyle]}>
              <Button
                rounded={"3xl"}
            
                py={5}
                _text={{
                  color: "#C0392B",
                  fontSize: "16",
                  fontFamily: "Poppins-Bold",
                }}
                borderColor={"#C0392B"}
                my={2}
                variant="outline"
                _pressed={{ bgColor: "#f2d7d4" }}
                onPress={() => navigation.navigate("login")}
              >
                Connexion
              </Button>
              </Animated.View>
            </Center>
          </Column>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover", // Assurez-vous que l'image couvre l'ensemble de la vue
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Couleur de fond semi-transparente pour le contenu superposé
  },
  text: {
    color: "white",
    fontSize: 24,
  },
  /* d */
  buttonContainer: {

    width: "70%",
    display: "flex",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
  },
});
