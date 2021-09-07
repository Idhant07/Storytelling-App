import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Speech from "expo-speech";
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class StoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: "grey",
      speakerIcon: "volume-high-outline",
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
  async initiateTTS(title, author, story, moral) {
    const currentColor = this.state.speakerColor;
    this.setState({
      speakerColor: currentColor === "grey" ? "white" : "grey",
    });
    if (currentColor === "grey") {
      Speech.speak("${title}by${author}");
      Speech.speak(story);
      Speech.speak("the moral of the story iz");
      Speech.speak(moral);
    } else {
      Speech.stop();
    }
  }
  render() {
    if (!this.props.route.params) {
      this.props.navigate.navigate("Home");
    } else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView styles={styles.androidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={{
                  resizeMode: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
            <View style={styles.dataContainer}>
              <View style={styles.titleTextContainer}>
                <View style={styles.storyTitle}>
                  <Text style={styles.storyTitleText}>
                    {this.props.route.params.story.title}
                  </Text>
                </View>
                <View style={styles.storyAuthor}>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.story.author}
                  </Text>
                </View>
                <View style={styles.storyAuthor}>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.story.createdOn}
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.initiateTTS(
                      this.props.route.params.story.title,
                      this.props.route.params.story.author,
                      this.props.route.params.story.story,
                      this.props.route.params.story.moral
                    );
                  }}
                >
                  <Ionicons
                    name={this.state.speakerIcon}
                    size={RFValue(30)}
                    color={this.state.speakerColor}
                    style={{
                      margin: RFValue(15),
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                {this.props.story.description}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.likeButton}>
                <View style={styles.likeIcon}>
                  <Ionicons
                    name={"heart"}
                    style={{
                      width: 30,
                      height: 40,
                      marginTop: 5,
                      marginLeft: 20,
                    }}
                    size={30}
                  />
                </View>
                <View>
                  <Text style={styles.likeText}>10K</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20),
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250),
  },
  titleContainer: { paddingLeft: RFValue(20), justifyContent: "center" },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white",
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white",
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10),
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
