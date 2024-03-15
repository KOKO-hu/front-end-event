import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CheckIcon,
  Icon,
  Input,
  Row,
  Select,
  Text,
  useDisclose,
} from "native-base";
import { useFonts } from "expo-font";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import DateInput from "../../layout/DateInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { EVENT_PRIVATE, EVENT_PUBLIC, TYPE_EVENT } from "../../helper/Index";
import SelectActionsheet from "../../layout/Actionsheet";
import { cityAll, countryAll, districtAll } from "../../api/events";
import { validateCreateEvent } from "../../helper/validator";
import { createEventReducer } from "../../redux/eventReducer";
import { useDispatch } from "react-redux";

const CreateEvent = () => {
  const [nameEvent, setNameEvent] = useState();
  const [country, setCountry] = useState([]);
  const [countryLocation, setCountryLocation] = useState()
  const [valueCountry, setValueCountry] = useState();
  const [city, setCity] = useState([]);
  const [valueCity, setValueCity] = useState();
  const [cityLocation, setCityLocation] = useState()
  /* quatier */
  const [district, setDistrict] = useState([]);
  const [valueDistrict, setValueDistrict] = useState();
const [districtLocation, setDistrictLocation] = useState()

  const [dateStart, setDateStart] = useState(new Date(1598051730000));
  const [dateEnd, setDateEnd] = useState(new Date(1598051730000));
  const { isOpen, onOpen, onClose } = useDisclose();
  let [typeEvent, setTypeEvent] = React.useState("");
  const [ctgEvent, setCtgEvent] = React.useState("");
  const [errors, setErrors] = React.useState()
  const [loading , setLoading] = React.useState(false)
  const navigation = useNavigation();
  const dispatch = useDispatch()
  /* handle */
  const handleEvent = ()=>{
    setLoading(true)
    const data  = {
      title: nameEvent,
      country: countryLocation,
      city:cityLocation,
      district: districtLocation,
      dateStart,
      dateEnd,
      typeEvent,
      ctgEvent,
    }
    console.log(data)
const {valid , errors}=validateCreateEvent(data)
if (!valid) {
  console.log(errors)
  setErrors(errors)
  setLoading(false)
}else{
  dispatch(createEventReducer(data))
  setLoading(false)
  navigation.navigate("descriptionEvent")
  
}

  }
  /* contry */
  useEffect(() => {
    countryAll()
      .then((country) => {
        const datacoutry = country.data.map((evnt) => {
          return {
            name: evnt?.name?.common,
            uri: evnt?.flags?.png,
            idf: evnt?.cca2,
          };
        });
        datacoutry.sort((a, b) => a.name.localeCompare(b.name));
        setCountry(datacoutry);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          value={nameEvent}
          onChangeText={(item)=>setNameEvent(item)}
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
          {errors?.title &&(
            <Box mx={4}><Text color={"red.600"} fontSize={10}>{errors?.title}</Text></Box>
          )}
        </Box>
        {/* Pays */}
        <Box p={4}>
          <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
            Pays *
          </Text>
          <Select
            py={5}
            rounded={"2xl"}
            selectedValue={valueCountry}
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
            onValueChange={(itemValue) => {
              setValueCountry(itemValue);
              setCountryLocation(country.filter((value) => value.idf===itemValue))
              cityAll({ searchCity: itemValue })

                .then((city) => {
                  console.log(city.data);
                  const dataCity = city.data.cities.map((cty) => {return {name:cty.name,latitude:cty.latitude,longitude:cty.longitude}});
                 
                  setCity(dataCity);
                })
                .catch((error) => {
                  console.log("erreur dfscity", error);
                });
            }}
          >
            {country.map((country) => (
              <Select.Item
                shadow={2}
                label={country?.name}
                value={country?.idf}
              />
            ))}
          </Select>
          {errors?.country &&(
            <Box mx={4}><Text color={"red.600"} fontSize={10}>{errors?.country}</Text></Box>
          )}
        </Box>

        {/* ville */}
        <Box p={4}>
          <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
            Ville *
          </Text>
          <Select
            py={5}
            rounded={"2xl"}
            selectedValue={valueCity}
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
            onValueChange={(itemValue) => {
           setValueCity(itemValue)
           
       setCityLocation(city.filter((value) => value.name===itemValue))
              districtAll({ searchDistrict: itemValue })
                .then((district) => {
        
                  const datadistrict = district?.data?.quartiers.map((cty) => {
                    return {
                      latitude: cty.latitude,
                      longitude: cty.longitude,
                      name: cty.name,
                    };
                  });
                  setDistrict(datadistrict);
                })
                .catch((error) => {
                  console.log("erreur dfscity", error);
                });
            }}
          >
            {city.map((city) => (
              <Select.Item  key={city.name} shadow={2} label={city.name} value={city.name} />
            ))}
          </Select>
          {errors?.city &&(
            <Box mx={4}><Text color={"red.600"} fontSize={10}>{errors?.city}</Text></Box>
          )}
        </Box>
        {/* quartier */}

        <Box p={4}>
          <Text mx={4} mb={1} fontFamily={"Poppins-regular"}>
            Quartier
          </Text>
          <Select
            py={5}
            rounded={"2xl"}
            selectedValue={valueDistrict}
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
            onValueChange={(itemValue) => {
              setValueDistrict(itemValue);
              const location = district.find((value) => value.name===itemValue)
              console.log(location)
              setDistrictLocation(location)
             
            }}
          >
            {district.map((dist) => (
              <Select.Item shadow={2} label={dist.name} value={dist.name} />
            ))}
          </Select>
        </Box>
        {/* date */}

        <DateInput
          date={dateStart}
          setDate={setDateStart}
          title={"Date début"}
        />
          {errors?.dateStart &&(
            <Box mx={4}><Text color={"red.600"} fontSize={10}>{errors?.dateStart}</Text></Box>
          )}
        <DateInput date={dateEnd} setDate={setDateEnd} title={"Date fin"} />
        {errors?.dateEnd &&(
            <Box mx={4}><Text color={"red.600"} fontSize={10}>{errors?.dateEnd}</Text></Box>
          )}
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
          {errors?.typeEvent &&(
            <Box mx={4}><Text color={"red.600"} fontSize={10}>{errors?.typeEvent}</Text></Box>
          )}
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
            {errors?.ctgEvent &&(
            <Box mx={4}><Text color={"red.600"} fontSize={10}>{errors?.ctgEvent}</Text></Box>
          )}
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
            {errors?.ctgEvent &&(
            <Box mx={4}><Text color={"red.600"} fontSize={10}>{errors?.ctgEvent}</Text></Box>
          )}
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
            onPress={() =>handleEvent() /* */}
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
