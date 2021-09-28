import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import CreateStory from "../screens/createStory";
import Feed from "../screens/feed";
import { RFValue } from "react-native-responsive-fontsize";
import React, { Component } from "react";
import firebase from "firebase/app";
require("@firebase/auth");

const Tab = createMaterialBottomTabNavigator();
export default class BottomTabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = { lightTheme: true, isUpdated: false };
  }
  componentDidMount() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({
      lightTheme: theme === "light" ? true : false,
    });
  }
  renderFeed = (props) => {
    return <Feed setUpdateToFalse={this.removeUpdated} {...props} />;
  };

  renderStory = (props) => {
    return <CreateStory setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  changeUpdated = () => {
    this.setState({
      isUpdated: true,
    });
  };

  removeUpdated = () => {
    this.setState({
      isUpdated: false,
    });
  };

  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={
          this.state.lightTheme
            ? styles.bottomTabStyleLight
            : styles.bottomTabStyle
        }
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Feed") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "CreateStory") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
                style={styles.icons}
              />
            );
          },
        })}
        activeColor={"tomato"}
        inactiveColor={"grey"}
      >
        <Tab.Screen
          name="Feed"
          component={this.renderFeed}
          options={{
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="CreateStory"
          component={this.renderStory}
          options={{
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "blue",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30),
  },
  bottomTabStyleLight: {
    backgroundColor: "grey",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
  },
});
