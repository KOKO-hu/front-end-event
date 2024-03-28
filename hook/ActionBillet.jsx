import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { detailTicketByUser, ticketByIdUpComing, ticketByIdUpPast } from "../api/billet";

const ActionBillet = () => {
  const [tickets, setTichets] = useState([]);
  const [ticketsPast, setTichetsPast] = useState([]);
  const [loading, setLoading] = useState(true);

  const [choiceTicket, setChoiceTicket] = useState("À vénir");
  /*  */
  const handleEndReached = () => {};
  const handleChoiceTicket = (value) => {
    setChoiceTicket(value);
  };
  /*  */

  useEffect(() => {
    ticketByIdUpComing({ page: 1, limit: 8 })
      .then((tickets) => {
        console.log(tickets.data.tickets)
        setTichets(tickets.data.tickets);
        setLoading(false);
      })
      .catch((error) => {
        console.log("events error", error);
        setLoading(false);
      });
  }, []);
  /* ticket terminé */
  useEffect(() => {
    ticketByIdUpPast({ page: 1, limit: 8 })
      .then((tickets) => {
        console.log(tickets.data.tickets)
        setTichetsPast(tickets.data.tickets);
        setLoading(false);
      })
      .catch((error) => {
        console.log("events error", error);
        setLoading(false);
      });
  }, []);
/*    useEffect(()=>{

   },[]) */
  return {
    tickets,
    loading,
    handleEndReached,
    handleChoiceTicket,
    choiceTicket,
    ticketsPast,

  };
};

export default ActionBillet;

const styles = StyleSheet.create({});
