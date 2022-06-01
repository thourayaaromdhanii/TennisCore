import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { async } from 'parse/lib/browser/Storage';

export default function Post() {
  console.log('here')
  const [Tournament, setTournament] = useState({
    name: '',
    dateFin: '',
    dateDeb: '',
    matches: '',
    addBy: '',
  });
  const token = props.route.params.Token;
  const idUser = props.route.params.idUser;
  const config = {
    headers: { Authorization: `Bearer ${token}`, body: JSON.stringify({
      name: Tournament.name,
      dateDeb: Tournament.dateDeb,
      dateFin: Tournament.dateFin,
      matches: Tournament.matches,
    }), },
  };

  const [loading, setLoading] = useState(false);

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

  const saveData = async () => {
    setLoading(true);
    try {
      const response = await client.post(`/Tournament/list`,config);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Name'}
        onChangeText={(value) => onChangeName(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={'Date debut'}
        onChangeText={(value) => onChangeDateDeb(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={'Email'}
        onChangeText={(value) => onChangeDateFin(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={'Status'}
        onChangeText={(value) => onChangeMatches(value)}
        style={styles.input}
      />

      <TouchableOpacity onPress={saveData}>
        <View style={{ backgroundColor: 'blue', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    margin: 15,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(170, 199, 23, 0.4)",
    padding: 10,
    marginVertical: 5,
  },
});
