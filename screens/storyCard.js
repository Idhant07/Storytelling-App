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
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Ionicons from "react-native-vector-icons/Ionicons";
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class StoryCard extends React.Component {
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
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(
                "StoryScreen",
                (story = this.props.story)
              );
            }}
          >
            <SafeAreaView styles={styles.androidSafeArea} />
            <View style={styles.cardContainer}>
              <View style={styles.storyImage}>
                <Image
                  source={require("../assets/story_image_1.png")}
                  style={{
                    resizeMode: "contain",
                    width: Dimensions.get("window").width - 55,
                    height: 250,
                    borderRadius: 10,
                  }}
                />
              </View>
              <View style={styles.titleContainer}>
                <View style={styles.titleTextContainer}>
                  <View style={styles.storyTitle}>
                    <Text style={styles.storyTitleText}>
                      {this.props.story.title}
                    </Text>
                  </View>
                  <View style={styles.storyAuthor}>
                    <Text style={styles.storyAuthorText}>
                      {this.props.story.author}
                    </Text>
                  </View>
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
          </TouchableOpacity>
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
