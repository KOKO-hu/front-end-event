import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";
const Back = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Box p={2}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </Box>
    </Pressable>
  );
};

export default Back;

const styles = StyleSheet.create({});
