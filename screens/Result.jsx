import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";


export default function Result({ route, navigation }) {
  const { result, img } = route.params;
  const { height } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: img.uri }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: height * 0.5,
        }}
      />
      <Icon
        name="arrowleft"
        style={styles.iconleft}
        size={24}
        color="white"
        onPress={() => navigation.navigate("Scan")}
      />
      <ScrollView style={{ flex: 1 }}>
        <ShowFirstResultInfo dInfo={result[0]} />
        <ShowSimilaritiesResultInfo similar1={result[1]} similar2={result[2]} nav={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

const ShowFirstResultInfo = ({ dInfo }) => {
  return (
    <>
      <Text style={styles.title}>{dInfo.diseaseName}</Text>
      <Text style={styles.title2}>Description</Text>
      <View style={{ marginBottom: 8 }}>
        <Text
          style={{
            fontSize: 16,
            paddingLeft: 24,
            paddingRight: 24,
            color: "white",
          }}
        >
          {dInfo.description}
        </Text>
      </View>
      <Text style={styles.title2}>Symptoms</Text>
      {dInfo.symptoms?.map((s, i) => (
        <View key={i} style={{ marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 24,
              paddingRight: 24,
              color: "white",
            }}
          >{`\u2022 ${s}`}</Text>
        </View>
      ))}
      <Text style={styles.title2}>Home Remedy</Text>
      {dInfo.remedy?.map((s, i) => (
        <View key={i} style={{ marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 24,
              paddingRight: 24,
              color: "white",
            }}
          >{`\u2022 ${s}`}</Text>
        </View>
      ))}

      <Text style={styles.title2}>Treatment</Text>
      {dInfo.treatment?.map((s, i) => (
        <View key={i} style={{ marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 24,
              paddingRight: 24,
              color: "white",
            }}
          >{`\u2022 ${s}`}</Text>
        </View>
      ))}
    </>
  );
};

const ShowSimilaritiesResultInfo = ({ similar1, similar2, nav }) => {
  return (
    <>
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 24, color: "white" }}>
          SIMILAR RESULTS
        </Text>
        <Text style={styles.title2}>{similar1.diseaseName}</Text>
        <Text style={styles.title2}>{similar2.diseaseName}</Text>
      </View>
    </>
  );
};

const w = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#06113C",
    flex: 1,
    alignItems: "center",
    gap: 12,
    position: "relative",
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 10,
    width: w,
    textAlign: "center",
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
    marginBottom: 10,
    textAlign: "left",
    width: w,
    paddingLeft: 20,
    paddingLeft: 20,
  },
  widgettitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#EEEEEE",
    textTransform: "uppercase",
    textAlign: "center",
  },
  box_text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EEEEEE",
    textTransform: "uppercase",
    textAlign: "center",
  },
  widgets: {
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: w * 0.95,
    marginBottom: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  iconleft: {
    position: "absolute",
    left: 15,
    top: 30,
  },
  textbox: {
    display: "flex",
    height: 120,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  search_input: {
    height: 40,
    width: w * 0.7,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  search_box: {
    width: w,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    magrinBottom: 10,
  },
  search_btn: {
    marginTop: 4,
    height: 40,
    width: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF8C32",
  },
  cardImg: {
    height: 90,
    width: 90,
    borderRadius: 10,
  },
  textdiv: {
    flex: 1,
  },
  text: {
    flexWrap: "wrap",
  },
});
