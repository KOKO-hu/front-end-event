import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const ActionFavorie = () => {
  const [favorieRemove, setFavorieRemove] = useState({});
  const handleRemoveFavorie = (data) => {
    console.log("handleRemoveFavorie", data);
    
  };

  //useEffect < (() => {}, [setFavorieRemove, favorieRemove]);
  return {
    handleRemoveFavorie,
    favorieRemove: favorieRemove,
    setFavorieRemove: setFavorieRemove,
  };
};

export default ActionFavorie;

const styles = StyleSheet.create({});
