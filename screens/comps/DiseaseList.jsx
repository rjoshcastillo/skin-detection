import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function DiseaseList({ diseases }) {
  const navigation = useNavigation();

  const handleItemPress = (disease) => {
    console.log(disease);
    navigation.navigate('Info', { disease });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {diseases.map((d, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleItemPress(d)} 
            style={styles.widgets}
          >
            <Image source={{ uri: d.image }} style={styles.cardImg} resizeMode="cover" />
            <View style={styles.textdiv}>
              <Text style={styles.title}>{d.diseaseName}</Text>
              <Text style={styles.text} ellipsizeMode="tail" numberOfLines={4}>
                {d.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const w = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  
  widgets: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: w * 0.96,
    marginTop: 1,
    paddingHorizontal: 10,
    gap: 10
  },

  textdiv: {
    flex: 1,
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#06113C",
    textTransform: "uppercase",
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
