import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();

import Post from '../components/Post';
import Get from '../components/Get';
import Detail from '../components/Detail'

const rootStack = (props) => {
  console.log(props)
  return (
    <Stack.Navigator
    
    screenOptions={{
      headerStyle: {
        backgroundColor: "rgba(170, 199, 23, 0.4)",
      },
      headerTintColor: 'white',
    }}>
      <Stack.Screen
        name="Get"
        component={Get}
        initialParams={{Token:props.Token,idUser:props.idUser}}
        options={{
          title: 'Tournaments',
          headerRight: () => (
          <Ionicons
              name={'ios-add-circle'}
              size={25}
              color={'white'}
              onPress={() => navigation.navigate('Post')}
              style={{ marginRight: 15 }}
            />
          ),
        }}
      />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

//console.log(props.route.params.Token)

export default rootStack;
