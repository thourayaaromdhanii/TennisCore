//import liraries
import React, { Component, useState } from 'react';
import client from "../api/client";
import { Table, Row, Rows } from 'react-native-table-component';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { async } from 'parse/lib/browser/Storage';

// create a component
const Detail = (props,{ route, navigation }) => {
  const token = props.route.params.Token;
  const idUser = props.route.params.idUser;
  console.log(token)
 const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const  item  = props.route.params.item;
  
 
const [Matches, setMatches] = useState();
const [player1, setplayer1] = useState();
const [player2, setplayer2] = useState();
  const [Tournament, setTournament] = useState({
    name: item.name,
    dateDeb: item.dateDeb,
    dateFin: item.dateFin,
    matches: item.matches,
  });
  const getMatchesData = async () => {
    try {
      const response = await client.get(`/Tournament/${item._id}/matches`,config);
      console.log("aaaaa",response.data.data.Matches,"aaaaa")
      setMatches(response.data.data.Matches);
      } catch (error) {
      console.error(error);
    }
  };
  useState(() => {
    getMatchesData();
    
  }, []);

const onChangeName = (value) => {
    setTournament({ ...Tournament, name: value });
  };

  const onChangeDateDeb = (value) => {
    setTournament({ ...Tournament, dateDeb: value });
  };

  const onChangeDateFin = (value) => {
    setTournament({ ...Tournament, dateFin: value });
  };

  const onChangeMatches = (value) => {
    setTournament({ ...Tournament, matches: value });
  };

  const updateData = () => {
    var myHeaders = new Headers();

    myHeaders.append(
      'Authorization',
      'Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263'
    );

    myHeaders.append('Content-Type', 'application/json');

    fetch('https://gorest.co.in/public-api/Tournaments/'+item._id, {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify({
        name: Tournament.name,
        DateDeb: Tournament.DateDeb,
        DateFin: Tournament.DateFin,
        status: Tournament.status,
      }),
    })
      .then((response) => {
        response.text();
        navigation.push('Get')
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const deleteData = () => {
    var myHeaders = new Headers();

    myHeaders.append(
      'Authorization',
      'Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263'
    );

    myHeaders.append('Content-Type', 'application/json');

    fetch('https://gorest.co.in/public-api/Tournaments/'+item.id, {
      method: 'DELETE',
      headers: myHeaders,
      body: JSON.stringify({
        name: Tournament.name,
        DateDeb: Tournament.adminId,
        DateFin: Tournament.DateFin,
        status: Tournament.role,
      }),
    })
      .then((response) => {
        response.text();
        navigation.push('Get')
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  const playerdata=async(_id)=>{
    const player = await client.get(`/player/${_id}`,config);
    const player_=player.data.data.Player.Name.toString()
    console.log("hhhhh",player.data.data.Player.Name.toString())
    return player_
  }

  const renderMItem = ({ item }) => {
    playerdata(item.player1).then(player_=> setplayer1(player_));
    playerdata(item.player2).then(player_=>  setplayer2(player_));

     return (
       <TouchableOpacity
        >
         <View
           style={{
             borderBottomWidth: 1,
             borderBottomColor: "rgba(170, 199, 23, 0.4)",
             padding: 5,
           }}
         >
           <Text style={{ fontWeight: "bold" }}>Match :  { player1} Vs {player2}</Text>
           <Text style={{ fontWeight: "bold" }}>Begin date : {item.dateDeb}</Text>
           
         </View>
       </TouchableOpacity>
     );
   };
 

 return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Name'}
        onChangeText={(value) => onChangeName(value)}
        style={styles.input}
        value={Tournament.name}
      />
      <TextInput
        placeholder={'Begin date'}
        onChangeText={(value) => onChangeDateDeb(value)}
        style={styles.input}
        value={Tournament.dateDeb}
      />
      <TextInput
        placeholder={'End Date'}
        onChangeText={(value) => onChangeDateFin(value)}
        style={styles.input}
        value={Tournament.dateFin}
      />
   <View>
       <FlatList
         data={Matches}
         renderItem={renderMItem}
         keyExtractor={(item_) => item_._id}
       />
     </View>
      <View style={{
    alignItems: 'center'}}>
        <TouchableOpacity style={styles.button} onPress={updateData}>
          <View style={{ backgroundColor: "rgba(170, 199, 23, 0.4)", padding: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Update</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonAlt} onPress={deleteData}>
          <View style={{ backgroundColor: 'white', padding: 10 }}>
            <Text style={{ color:  "rgba(170, 199, 23, 0.4)", textAlign: 'center' }}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(170, 199, 23, 0.4)",
    padding: 10,
    marginVertical: 5,
  },
  button: {
    width: "80%",
    backgroundColor: "#aac717",
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
  buttonAlt: {
    width: "80%",
    borderWidth: 1,
    height: 40,
    borderRadius: 50,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonAltText: {
    color: "black",
    fontSize: 16,
    fontWeight: "400",
  },
});

//make this component available to the app
export default Detail;
