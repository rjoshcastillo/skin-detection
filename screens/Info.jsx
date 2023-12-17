import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function Info({ route, navigation }) {
  const { height, width } = useWindowDimensions();
  const { disease } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    });
  }, [navigation]);


  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: disease.image }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: height * 0.25,
        }}
      />
      <Icon
        name="arrowleft"
        style={styles.iconleft}
        size={24}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.title}>{disease.diseaseName}</Text>
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
            {disease.description}
          </Text>
        </View>
        <Text style={styles.title2}>Symptoms</Text>
        {disease.symptoms?.map((s, i) => (
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
        {disease.remedy?.map((s, i) => (
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
        {disease.treatment?.map((s, i) => (
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
      </ScrollView>
    </SafeAreaView>
  );
}

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
    marginBottom: 20,
    width: w,
    textAlign: "center",
    marginTop: 20
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
    top: 15,
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
