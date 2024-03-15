import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { allEvent } from "../api/events";

const FilterEvent = () => {
  const [events, setEvents] = useState([]);
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
    allEvent({ page: 1, limit: 8, categorie_event: "" })
      .then((events) => {
        console.log("resultat est",events.data)
        setEvents(events.data.events);
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
    events: events,
    keyValue,
    loading
  };
};

export default FilterEvent;

const styles = StyleSheet.create({});
