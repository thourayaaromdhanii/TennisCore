import { Dimensions } from "react-native";
import Header from "../components/Header";
import Auth from "../screens/Auth";
import Home from "../screens/Home";
import Tournament from "../screens/Tournament";
import Profile from "../screens/Profile";
import Onboarding from "../screens/Onboarding";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawerContent from "./Menu";
import { createStackNavigator } from "@react-navigation/stack";
// header for screens

// drawer
const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
}

function AuthStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Auth"
        initialParams={{ User: props.route.params.User }}
        component={Auth}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="app" component={AppStack} />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  console.log(props.route.params, "t................l");
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "False",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        initialParams={{
          Token: props.route.params.Token,
          idUser: props.route.params.idUser,
        }}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent white navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function TournamentStack(props) {
  console.log(props.route.params, "tl");
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: "False",
      }}
    >
      <Stack.Screen
        name="Tournament"
        component={Tournament}
        initialParams={{
          Token: props.route.params.Token,
          idUser: props.route.params.idUser,
        }}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent white navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        mode: "card",
        headerShown: "screen",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={TournamentStack}
        initialParams={{
          Token: props.route.params.Token,
          idUser: props.route.params.idUser,
        }}
      />
      <Drawer.Screen
        name="Tournament"
        component={TournamentStack}
        initialParams={{
          Token: props.route.params.Token,
          idUser: props.route.params.idUser,
        }}
      />
      <Drawer.Screen name="Profile" component={ProfileStack} />
    </Drawer.Navigator>
  );
}
