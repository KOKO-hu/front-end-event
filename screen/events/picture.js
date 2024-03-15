import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Box, Button, Center, Image, Row, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { pickMedia, uploadFileAndGetDownloadURL } from "../../helper/Index";
import { Video, ResizeMode } from "expo-av";
import { createEventReducer } from "../../redux/eventReducer";
import { useDispatch } from "react-redux";

const Picture = () => {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = React.useState({});
  const [error, setError] = React.useState("");
  const dispatch = useDispatch();
  const video = React.useRef(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const handlesDeleteFile = (fileToDelete) => {
    const updatedFiles = files.filter(
      (file) => file.fileUri !== fileToDelete.fileUri
    );
    setFiles(updatedFiles);
  };
  /*  */
  const handleMedia = async () => {
    const response = await uploadFileAndGetDownloadURL(files);
    console.log("response", response);
    dispatch(createEventReducer({ medias: response }));
    navigation.navigate("resume");
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
      <Box flex={1} safeArea>
        <Row my={3} mx={3} mt={5}>
          <Box>
            <Text fontFamily={"Poppins-Regular"} color={"#C0392B"}>
              Annuler
            </Text>
          </Box>
          <Row flex={1} justifyContent={"center"}>
            <Text fontFamily={"Poppins-Bold"}>Médias</Text>
          </Row>
        </Row>
        {/* choix des photos */}
        <TouchableOpacity
          onPress={() =>
            pickMedia()
              .then((response) => {
                setFiles([
                  ...files,
                  {
                    type: response.assets[0].type,
                    fileUri: response.assets[0].uri,
                    fileName: response.assets[0].uri.split("/").pop(),
                  },
                ]);
                console.log(response);
              })
              .catch((err) => console.log(err))
          }
        >
          <Box
            borderWidth={1}
            mx={9}
            bgColor={"white"}
            rounded={"2xl"}
            borderColor={"#C0392B"}
            py={7}
            borderStyle={"dashed"}
          >
            <Row justifyContent={"center"} alignItems={"center"}>
              <AntDesign name="plus" size={24} color="black" />
            </Row>
          </Box>
        </TouchableOpacity>

        {/* liste picture selects */}
        {files.length > 0 ? (
          <Center mx={3}>
            <Row p={5} flexWrap={"wrap"}>
              {files.map((file) => (
                <>
                  {file.type === "image" ? (
                    <Box m={1}>
                      <Image
                        rounded={"md"}
                        source={{
                          uri: file.fileUri,
                        }}
                        alt="Alternate Text"
                        /*  size="xl" */
                        h={100}
                        w={120}
                      />
                      <Box position={"absolute"} left={"60%"} top={"8%"}>
                        <TouchableOpacity
                          onPress={() => handlesDeleteFile(file)}
                        >
                          <Box bgColor={"red.600"} rounded={20} p={2}>
                            <AntDesign name="delete" size={24} color="white" />
                          </Box>
                        </TouchableOpacity>
                      </Box>
                    </Box>
                  ) : (
                    <Box m={1}>
                      <View style={styles.container}>
                        <Video
                          ref={video}
                          style={styles.video}
                          source={{
                            uri: file?.uri,
                          }}
                          useNativeControls
                          resizeMode={ResizeMode.CONTAIN}
                          isLooping
                          onPlaybackStatusUpdate={(status) =>
                            setStatus(() => status)
                          }
                        />
                        <Box position={"absolute"} left={"60%"} top={"8%"}>
                          <TouchableOpacity
                            onPress={() => handlesDeleteFile(file)}
                          >
                            <Box bgColor={"red.600"} rounded={20} p={2}>
                              <AntDesign
                                name="delete"
                                size={24}
                                color="white"
                              />
                            </Box>
                          </TouchableOpacity>
                        </Box>
                      </View>
                    </Box>
                  )}
                </>
              ))}
            </Row>
          </Center>
        ) : (
          <Row justifyContent={"center"} alignItems={"center"} flex={1}>
            <Text fontFamily={"Poppins-Regular"}>
              Aucune photo sélectionner
            </Text>
          </Row>
        )}
        {/* buton */}
        <Box my={3} p={4}>
          <Button
            py={5}
            rounded={"3xl"}
            w={"100%"}
            _text={{ color: "white", fontFamily: "Poppins-Bold" }}
            borderColor={"#C0392B"}
            bgColor={"#C0392B"}
            my={2}
            isLoading={loading}
            /* variant="outline" */
            _pressed={{ bgColor: "#f2d7d4" }}
            onPress={() => handleMedia()}
          >
            Suivant
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Picture;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",

    /*     justifyContent: "center",
   , */
  },
  video: {
    borderRadius: "10",
    /*   alignSelf: "center", */
    width: 120,
    height: 100,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
