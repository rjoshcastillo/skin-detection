import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import DiseaseServices from "../services/disease.services";
import { SearchBar } from "react-native-elements";
import DiseaseList from "./comps/DiseaseList";
import Icon from "react-native-vector-icons/Ionicons";
import * as FileSystem from "expo-file-system";

export default function Home({ navigation }) {
  const [disease, setDiseaseData] = useState([]);
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (text) => {
    try {
      setError(null);
      const diseases = await DiseaseServices.getDiseaseByName(text);
      setFilteredDiseases(diseases);
    } catch (error) {
      setError("No record found.");
    }
  };

  const fetchData = async () => {
    try {
      const diseaseData = await DiseaseServices.getDiseases();

      const diseaseNames = diseaseData?.map((item) => item.diseaseName);

      if (diseaseNames.length > 0) {
        const jsonString = JSON.stringify(diseaseNames, null, 2);

        const filePath = `${FileSystem.documentDirectory}diseasesMetaData.json`;
        await FileSystem.writeAsStringAsync(filePath, jsonString, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        console.log(`Disease metadata have been written to ${filePath}`);
      } else {
        console.warn("Disease data is empty.");
      }

      setDiseaseData(diseaseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(text) => handleSearch(text)}
        platform="android"
      />
      {error ? (
        <Text style={{ color: "#aeb5b0", marginTop: 40, textAlign: "center" }}>
          {error}
        </Text>
      ) : (
        <DiseaseList
          diseases={filteredDiseases?.length > 0 ? filteredDiseases : disease}
        />
      )}

      <TouchableOpacity
        style={styles.circularButton}
        onPress={() => navigation.navigate("Scan")}
      >
        <Icon name="ios-qr-code" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circularButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#007BFF",
    borderRadius: 50,
    padding: 15,
  },
});
