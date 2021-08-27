import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import CreateStory from "../screens/createStory";
import Feed from "../screens/feed";
import { RFValue } from "react-native-responsive-fontsize";

const Tab = createMaterialBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyle}
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
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="CreateStory" component={CreateStory} />
    </Tab.Navigator>
  );
};
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
});

export default BottomTabNavigator;
