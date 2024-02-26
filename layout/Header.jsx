import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Badge, Box, Row } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
const Header = () => {
  return (
  
      <Row justifyContent={"space-between"} mt={4} p={4}>
        <Box>
          <Text>logo</Text>
        </Box>
        <Row space={3}>
          <Box p={1} px={3}>
            <Badge // bg="red.400"
              colorScheme="danger"
              rounded="full"
              mb={-4}
              mr={-4}
              zIndex={1}
              variant="solid"
              alignSelf="flex-end"
              _text={{
                fontSize: 10,
              }}
            >
              2
            </Badge>
            <Ionicons name="notifications" size={28} color="black" />
          </Box>
          {/*     <Box rounded={"lg"} px={3} p={2} bgColor={'#C0392B'}><Fontisto name="favorite" size={20} color="white" /></Box> */}
        </Row>
      </Row>
 
  );
};

export default Header;

const styles = StyleSheet.create({});
