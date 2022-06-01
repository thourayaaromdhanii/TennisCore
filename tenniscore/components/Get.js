//import liraries
import React, { Component, useEffect, useState } from "react";
import client from "../api/client";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  
} from "react-native";

// create a component
const Get = (props, { navigation }) => {
  const [Tournament, setTournament] = useState();
  const token = props.route.params.Token;
  const idUser = props.route.params.idUser;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getTournamentData = async () => {
    try {
      const response = await client.get(`/Tournament/list`,config);
      console.log(response.data.data.Tournament,'tttttt_____')
      setTournament(response.data.data.Tournament);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    getTournamentData();
  }, []);

  const renderItem = ({ item }) => {
    
   const  {navigation}= props
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { item: item,Token:token,idUser:idUser})}
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "rgba(170, 199, 23, 0.4)",
            padding: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Name :{item.name}</Text>
          <Text style={{ fontWeight: "bold" }}>Begin date : {item.dateDeb}</Text>
          <Text style={{ fontWeight: "bold" }}>End Date : {item.dateFin}</Text>
          
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Tournament}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
    
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

//make this component available to the app
export default Get;
