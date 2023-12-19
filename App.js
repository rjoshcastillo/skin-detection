import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as FileSystem from "expo-file-system";
import Scan from "./screens/Scan";
import Diseases from "./screens/Diseases";
import Toast from "react-native-toast-message";
import Info from "./screens/Info";
import Result from "./screens/Result";
import DiseaseServices from "./services/disease.services";

const Stack = createNativeStackNavigator();

export default function App() {

  const fetchData = async () => {
    try {
      const diseaseData = await DiseaseServices.getDiseases();
      const diseaseNames = diseaseData?.map((item) => item.diseaseName);
      console.log(diseaseData);
      if (diseaseNames.length > 0) {
        const jsonString = JSON.stringify(diseaseNames, null, 2);

        const filePath = `${FileSystem.documentDirectory}diseaseMapping.json`;
        await FileSystem.writeAsStringAsync(filePath, jsonString, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        console.log(`Disease metadata have been written to ${filePath}`);
      } else {
        console.warn("Disease data is empty.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scan">
        <Stack.Screen
          name="Scan"
          component={Scan}
          options={{
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "black" },
            headerTitleAlign: "center",
            headerTintColor: "black",
          }}
        />
        <Stack.Screen
          name="Diseases"
          component={Diseases}
          options={{
            headerStyle: { backgroundColor: "#06113C" },
            headerTitleStyle: { color: "white" },
            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Info"
          component={Info}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Result"
          component={Result}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
