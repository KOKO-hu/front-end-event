import { StyleSheet } from "react-native";
import { deleteFavorie, postFavorie } from "../api/favorie";
import { Box, Text, useToast } from "native-base";

const FavorieEvent = () => {
  const toast = useToast();
  const handleAddFavorie = async (event) => {
    try {
      const { data } = await postFavorie({ id_event: event._id });
      toast.show({
        placement: "bottom",
        render: () => {
          return (
            <Box w={'100%'} bg="black" px="2"  rounded="sm" py={3}>
              <Text color={"white"}>{data?.message}</Text>
            </Box>
          );
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveFavorie = async (idEvent) => {
    console.log("handleRemoveFavorie",idEvent)
    try {
      const { data } = await deleteFavorie(idEvent);
      toast.show({
        /*  description: `${data?.message}`, */
        placement: "bottom",
        render: () => {
          return (
            <Box   w={'100%'} bg="black" px="2"  rounded="sm" py={3}>
              <Text color={"white"}>{data?.message}</Text>
            </Box>
          );
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    handleAddFavorie,
    handleRemoveFavorie,
  };
};

export default FavorieEvent;

const styles = StyleSheet.create({});
