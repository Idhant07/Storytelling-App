import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import StoryCard from "./storyCard";
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};
let stories = require("../temp_stories.json");

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }
  async loadFonts() {
    await Font.loadAsync(customFonts);
    this.setState({
      fontsLoaded: true,
    });
  }
  componentDidMount() {
    this.loadFonts();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item: story }) => {
    return <StoryCard story={story} />;
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView styles={styles.androidSafeArea} />
          <View styles={styles.appTitle}>
            <View styles={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                styles={{
                  width: 50,
                  height: 50,
                  marginLeft: 10,
                  resizeMode: "contain",
                }}
              />
            </View>
            <View styles={styles.appTitleTextContainer}>
              <Text styles={styles.appTitleText}>Storytelling App</Text>
            </View>
          </View>
          <View>
            <FlatList
              data={stories}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          </View>
          <Text>Feed</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  androidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  cardContainer: {
    flex: 0.85,
  },
});
