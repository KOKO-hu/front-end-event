import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { allEvent } from "../api/events";
import { getFavories, getFavoriesByUser } from "../api/favorie";

const FilterFavorie = () => {
  const [favories, setFavories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyValue, setKeyValue] = useState(0);
  const handleFilterEvent = async ({label ,key}) => {
    setLoading(true);
    setKeyValue(key)
    try {
      const { data } = await allEvent({
        page: 1,
        limit: 10,
        categorie_event: label,
      });
      console.log("resultat est",data.events.length);
     
        setEvents(data.events);
        setLoading(false);
   
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /* init events */
  useEffect(() => {
    getFavoriesByUser()
      .then((favories) => {
     /*    console.log("resultat est",favories.data) */
        setFavories(favories.data.favorites);
        setLoading(false)
       /*  console.log("events de is", events.data.events); */
      })
      .catch((error) => {
        console.log("events error", error);
        setLoading(false)
      });
  }, []);
  return {
    handleFilterEvent,
    favories,
    keyValue,
    loading,
    setFavories
  };
};

export default FilterFavorie;

const styles = StyleSheet.create({});
