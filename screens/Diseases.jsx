import React, { useEffect, useState } from "react";
import { SafeAreaView, TextInput, View, StyleSheet, Text } from "react-native";
import DiseaseServices from "../services/disease.services";
import DiseaseList from "./comps/DiseaseList";

export default function Diseases() {
  const [disease, setDiseaseData] = useState([]);
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleSearch = async (text) => {
    try {
      setError(null);
      await DiseaseServices.getDiseaseByName(text).then((res) => {
        if (res.statusCode === 404) {
          setError(res.message);
        } else {
          setFilteredDiseases(res);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      await DiseaseServices.getDiseases().then((res) => {
        if (res.statusCode === 404) {
          setError(res.message);
        } else {
          setDiseaseData(res);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSearchTextChange = (text) => {
    setSearchText(text);
    handleSearch(text);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a disease..."
          onChangeText={onSearchTextChange}
          value={searchText}
        />
      </View>
      {error ? (
        <Text style={{ textAlign: "center", color: "gray", marginTop: 15 }}>
          {error}
        </Text>
      ) : (
        <DiseaseList
          diseases={filteredDiseases?.length > 0 ? filteredDiseases : disease}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
});
