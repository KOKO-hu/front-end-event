import { StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  CheckIcon,
  Icon,
  Input,
  Row,
  Select,
  Text,
} from "native-base";
import { useFonts } from "expo-font";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import DateInput from "../../layout/DateInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { EVENT_PRIVATE, EVENT_PUBLIC, TYPE_EVENT } from "../../helper/Index";
const CreateEvent = () => {
  const [dateStart, setDateStart] = useState(new Date(1598051730000));
  const [dateEnd, setDateEnd] = useState(new Date(1598051730000));
  let [typeEvent, setTypeEvent] = React.useState("");
  const [ctgEvent, setCtgEvent] = React.useState("");
  const navigation = useNavigation();
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
      <Row my={3} mx={3} mt={5}>
        <Box>
          <Text fontFamily={"Poppins-Regular"} color={"#C0392B"}>
            Annuler
          </Text>
        </Box>
        <Row flex={1} justifyContent={"center"}>
          <Text fontFamily={"Poppins-Bold"}>Créer un évènement</Text>
        </Row>
      </Row>
      {/* nom evenement*/}
      <KeyboardAwareScrollView>
        <Box p={4}>
          <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
            Nom de l'évènement*
          </Text>
          <Input
            py={5}
            _focus={{
              borderColor: "#C0392B",
            }}
            rounded={"3xl"}
            bgColor={"white"}
            keyboardType="visible-password"
            /*     rightElement={
            <Box px={2}>
              <AntDesign name="eyeo" size={24} color="black" />
            </Box>
          } */
            size="lg"
            placeholder="Nom de l'évènements"
          />
        </Box>
        {/* localisation */}

        <Box p={4}>
          <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
            Localisation
          </Text>
          <Input
            py={5}
            _focus={{
              borderColor: "#C0392B",
            }}
            rounded={"3xl"}
            bgColor={"white"}
            keyboardType="visible-password"
            /*     rightElement={
            <Box px={2}>
              <AntDesign name="eyeo" size={24} color="black" />
            </Box>
          } */
            size="lg"
            placeholder="Localisation"
          />
        </Box>
        {/* date */}

        <DateInput
          date={dateStart}
          setDate={setDateStart}
          title={"Date début"}
        />
        <DateInput date={dateEnd} setDate={setDateEnd} title={"Date fin"} />
        {/* type event */}
        <Box p={4}>
          <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
            Type d'évènement *
          </Text>
          <Select
            py={5}
            rounded={"2xl"}
            selectedValue={typeEvent}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            _selectedItem={{
              bg: "white",
              endIcon: <CheckIcon size="5" />,
            }}
            _light={{
              bg: "white",
              _hover: {
                bg: "#C0392B",
              },
              _focus: {
                bg: "#C0392B",
              },
            }}
            _dark={{
              bg: "#C0392B",
              _hover: {
                bg: "#C0392B",
              },
              _focus: {
                bg: "#C0392B",
              },
            }}
            onValueChange={(itemValue) => setTypeEvent(itemValue)}
          >
            <Select.Item shadow={2} label="Public" value="Public" />
            <Select.Item shadow={2} label="Privé" value="Privé" />
          </Select>
        </Box>
        {/* Categories d'evenement PUBLIC */}
        {typeEvent == TYPE_EVENT[1].title && (
          <Box p={4}>
            <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
              Catégorie d'évènement public *
            </Text>
            <Select
              py={5}
              rounded={"2xl"}
              selectedValue={ctgEvent}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: "white",
                endIcon: <CheckIcon size="5" />,
              }}
              _light={{
                bg: "white",
                _hover: {
                  bg: "#C0392B",
                },
                _focus: {
                  bg: "#C0392B",
                },
              }}
              _dark={{
                bg: "#C0392B",
                _hover: {
                  bg: "#C0392B",
                },
                _focus: {
                  bg: "#C0392B",
                },
              }}
              onValueChange={(itemValue) => setCtgEvent(itemValue)}
            >
              {EVENT_PUBLIC.map((event_pb, key) => (
                <Select.Item
                  shadow={2}
                  label={event_pb.title}
                  value={event_pb.title}
                />
              ))}
            </Select>
          </Box>
        )}
        {/* Categorie d'evenement PRIVATE */}
        {typeEvent == TYPE_EVENT[0].title && (
          <Box p={4}>
            <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
              Catégorie d'évènement privé *
            </Text>
            <Select
              py={5}
              rounded={"2xl"}
              selectedValue={ctgEvent}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: "white",
                endIcon: <CheckIcon size="5" />,
              }}
              _light={{
                bg: "white",
                _hover: {
                  bg: "#C0392B",
                },
                _focus: {
                  bg: "#C0392B",
                },
              }}
              _dark={{
                bg: "#C0392B",
                _hover: {
                  bg: "#C0392B",
                },
                _focus: {
                  bg: "#C0392B",
                },
              }}
              onValueChange={(itemValue) => setCtgEvent(itemValue)}
            >
              {EVENT_PRIVATE.map((event_pv, key) => (
                <Select.Item
                  shadow={2}
                  label={event_pv.title}
                  value={event_pv.title}
                />
              ))}
            </Select>
          </Box>
        )}
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
            onPress={() => navigation.navigate("descriptionEvent")}
          >
            Suivant
          </Button>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({});
