import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";

import RadioGroup from "react-native-radio-buttons-group";
import { Block, Button, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

const { height, width } = Dimensions.get("screen");

const radioButtonsData = [
  {
    id: "1",
    label: "Parent",
    value: "parent",
    color:'#FFF',
    selected:true,
    labelStyle:{color:'#FFF'}
  
  },
  { 
    id: "2", 
    label: "Club    ", 
    value: "club" ,
    color:'#FFF',
    labelStyle:{color:'#FFF'}
  },
  {
    id: "3",
    label: "Coach",
    value: "coach",
    color:'#FFF',
    labelStyle:{color:'#FFF'}
  },
  {
    id: "4",
    label: "Admin",
    value: "admin",
    color:'#FFF',
    labelStyle:{color:'#FFF'}
  },
];
class Onboarding extends React.Component {
  state = { radioButtons: radioButtonsData };
  render() {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
          <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block style={styles.title}>
              <Block>
                <Text color="white" size={40}>
                  Complete as
                </Text>
              </Block>
              <Block>
                <RadioGroup 
                  radioButtons={this.state.radioButtons}
                  onPress={(radioButtonsArray) => {
                    this.setState({radioButtonsArray});
                  for (i=0;i<4;i++){
                    if(radioButtonsArray[i].selected==true){
                      User=radioButtonsArray[i].value
                    }
                  }}}
                />
              </Block>
            </Block>
            <Block center>
              <Button
                style={styles.button}
                color={argonTheme.COLORS.SECONDARY}
                onPress={() => navigation.navigate("Auth",{User:User})}
                textStyle={{ color: argonTheme.COLORS.BLACK }}
              >
                Get Started
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  logo: {
    width: 400,
    height: 120,
    zIndex: 2,
    position: "relative",
    marginTop: "-50%",
  },
  title: {
    marginTop: "-5%",
  },
  subTitle: {
    marginTop: 20,
  },
  container1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Onboarding;
