import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Avatar, Box, Divider, Row } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
const Footer = () => {
  const [active, setActive] = useState(0);
const navigation =useNavigation()
  const handlePress = (index) => {
    setActive(index);
    switch (index) {
      case 1:
        navigation.navigate("billet")
        break;
      case 2:
        navigation.navigate("favorie")
        break;
        
      default:
        break;
    }
  };

  return (
    <Row
      bgColor={"white"}
      borderBottomRadius={10}
      mb={3}
      p={3}
      px={5}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      {/* explore */}
      <TouchableOpacity onPress={() => handlePress(0)}>
        <Box>
          <Animatable.View animation={active === 0 ? "bounceIn" : null}>
            <MaterialIcons
              name="explore"
              size={29}
              color={active === 0 ? "#C0392B" : "black"}
            />
          </Animatable.View>
          {active === 0 && (
            <Divider
              my="2"
              _light={{
                bg: "#C0392B",
              }}
              _dark={{
                bg: "muted.50",
              }}
            />
          )}
        </Box>
      </TouchableOpacity>
      {/* ticket */}
      <TouchableOpacity onPress={() => handlePress(1)}>
        <Box>
          <Animatable.View animation={active === 1 ? "bounceIn" : null}>
            <FontAwesome5
              name="ticket-alt"
              size={29}
              color={active === 1 ? "#C0392B" : "black"}
            />
          </Animatable.View>
          {active === 1 && (
            <Divider
              my="2"
              _light={{
                bg: "#C0392B",
              }}
              _dark={{
                bg: "muted.50",
              }}
            />
          )}
        </Box>
      </TouchableOpacity>
      {/* plus */}
      <TouchableOpacity onPress={()=>navigation.navigate("createEvent")}>
        <Box
          bgColor={"#C0392B"}
          rounded={"full"}
          elevation={7}
          p={4}
          position={"relative"}
          bottom={5}
        >
          <MaterialCommunityIcons name="plus" size={29} color="white" />
        </Box>
      </TouchableOpacity>
      {/* favorie */}
      <TouchableOpacity onPress={() => handlePress(2)}>
        <Animatable.View animation={active === 2 ? "bounceIn" : null}>
          <Box>
            <Octicons
              name="heart-fill"
              size={29}
              color={active === 2 ? "#C0392B" : "black"}
            />
            {/*  <AntDesign name="hearto" size={29}  /> */}
            {active === 2 && (
              <Divider
                my="2"
                _light={{
                  bg: "#C0392B",
                }}
                _dark={{
                  bg: "muted.50",
                }}
              />
            )}
          </Box>
        </Animatable.View>
      </TouchableOpacity>
      {/* profil */}
      <Box>
        <Avatar
          size="xs"
          bg="cyan.500"
          source={{
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          }}
        >
          TE
        </Avatar>
      </Box>
    </Row>
  );
};

export default Footer;

const styles = StyleSheet.create({});
