import { StyleSheet } from "react-native";
import { deleteFavorie, postFavorie } from "../api/favorie";
import { Box, useToast } from "native-base";

const FavorieEvent = () => {
  const toast = useToast();
  const handleAddFavorie = async (event) => {
    try {
      const { data } = await postFavorie({ id_event: event._id });
      console.log(data);

      toast.show({
        /*  description: `${data?.message}`, */
        placement: "bottom",
        render: () => {
          return (
            <Box bg="black" px="2" py="1" rounded="sm" mb={5}>
              {data?.message}
            </Box>
          );
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveFavorie = async (idEvent) => {
    try {
      const { data } = await deleteFavorie(idEvent);
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
