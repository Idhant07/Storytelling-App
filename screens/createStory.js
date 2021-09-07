import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class CreateStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image1",
      dropDownHeight: 40,
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
      let previewImages = {
        image1: require("../assets/story_image_1.png"),
        image2: require("../assets/story_image_2.png"),
        image3: require("../assets/story_image_3.png"),
        image4: require("../assets/story_image_4.png"),
        image5: require("../assets/story_image_5.png"),
      };
      return (
        <View style={styles.container}>
          <SafeAreaView styles={styles.androidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={{
                  resizeMode: "contain",
                  width: Dimensions.get("window").width - 55,
                  height: 250,
                  borderRadius: 10,
                }}
              />
            </View>
            <View style={styles.appTitleContainer}>
              <Text style={styles.appTitleText}>New Story</Text>
            </View>
          </View>
          <View>
            <ScrollView>
              <Image
                source={previewImages[this.state.previewImage]}
                style={styles.previewImage}
              />
              <View>
                <DropDownPicker
                  items={[
                    { label: "image 1", value: "image1" },
                    { label: "image 2", value: "image2" },
                    { label: "image 3", value: "image3" },
                    { label: "image 4", value: "image4" },
                    { label: "image 5", value: "image5" },
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 50,
                    borderRadius: 20,
                    marginBottom: 20,
                  }}
                  onOpen={() => {
                    this.setState({
                      dropDownHeight: 170,
                    });
                  }}
                  onClose={() => {
                    this.setState({
                      dropDownHeight: 40,
                    });
                  }}
                  style={{ backgroundColor: "transparent" }}
                  itemStyle={{ justifyContent: "flex-start" }}
                  labelStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans",
                  }}
                  dropDownStyle={{ backgroundColor: "black" }}
                  arrowStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans",
                  }}
                  onChangeItem={(item) => {
                    this.setState({
                      previewImage: item.value,
                    });
                  }}
                />
              </View>
              <View>
                <TextInput
                  style={styles.inputFont}
                  onChangeText={(item) => {
                    this.setState({
                      item,
                    });
                  }}
                  placeholder={"Title"}
                  placeholderTextColor="white"
                />
                <TextInput
                  style={[
                    styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(item) => {
                    this.setState({
                      item,
                    });
                  }}
                  placeholder={"Description"}
                  placeholderTextColor="White"
                  multiline={true}
                  numberOfLines={4}
                />
                <TextInput
                  style={[
                    styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(item) => {
                    this.setState({
                      item,
                    });
                  }}
                  placeholder={"Story"}
                  placeholderTextColor="White"
                  multiline={true}
                  numberOfLines={20}
                />
                <TextInput
                  style={[
                    styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(item) => {
                    this.setState({
                      item,
                    });
                  }}
                  placeholder={"Moral of The Story"}
                  placeholderTextColor="White"
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#15193c" },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: { flex: 0.07, flexDirection: "row" },
  appIcon: { flex: 0.3, justifyContent: "center", alignItems: "center" },
  iconImage: { width: "100%", height: "100%", resizeMode: "contain" },
  appTitleTextContainer: { flex: 0.7, justifyContent: "center" },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  fieldsContainer: { flex: 0.85 },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans",
  },
  inputFontExtra: { marginTop: RFValue(15) },
  inputTextBig: { textAlignVertical: "top", padding: RFValue(5) },
});
