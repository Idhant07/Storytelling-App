import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../screens/profile";
import StackNavigator from "./stackNavigation";
import LogOut from "../screens/logOut";
import firebase from "firebase/app";
require("@firebase/auth");
import CustomSidebarMenu from "../screens/CustomSidebarMenu";

const Drawer = createDrawerNavigator();
export default class DrawerNavigator extends React.Component {
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

  render() {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#8f0e22",
          inactiveTintColor: this.state.lightTheme ? "black" : "white",
          iteamStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={StackNavigator}
          options={{
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            unmountOnBlur: true,
          }}
        />
        <Drawer.Screen
          name="Log Out"
          component={LogOut}
          options={{
            unmountOnBlur: true,
          }}
        />
      </Drawer.Navigator>
    );
  }
}
