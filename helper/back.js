import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "native-base";
const Back = () => {
  return (
    <Box p={2}>
      <Ionicons name="arrow-back" size={30} color="black" />
    </Box>
  );
};

export default Back;

const styles = StyleSheet.create({});
