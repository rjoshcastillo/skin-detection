import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import {
  getModel,
  convertBase64ToTensor,
  startPrediction,
} from "../helpers/tensor-helper";
import { cropPicture } from "../helpers/image-helper";
import DiseaseServices from "../services/disease.services";
import * as FileSystem from "expo-file-system";

const RESULT_MAPPING = [
  "acne",
  "alapap",
  "eczema",
  "melasma",
  "warts",
  "normal",
];

export default function Scan({ navigation }) {
  let cameraRef = useRef();
  const [permission] = Camera.useCameraPermissions();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    });
  }, [navigation]);

  useEffect(() => {
    __startCamera();
  }, []);

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      // do something
    } else {
      Alert.alert("Access denied");
    }
  };

  if (!permission) {
    return <Text>Requesting...</Text>;
  }

  if (!permission.granted) {
    return <Text>Permission not granted</Text>;
  }

  const readDiseaseMapping = async () => {
    try {
      const filePath = `${FileSystem.documentDirectory}diseasesMetaData.json`;

      const fileContent = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const jsonData = JSON.parse(fileContent);

      console.log("Data read from file:", jsonData);
      return jsonData;
    } catch (error) {
      console.error("Error reading data from file:", error);
      return null;
    }
  };

  let takePic = async () => {
    setLoading(true);
    let options = {
      base64: true,
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    processImagePrediction(newPhoto);
  };

  const processImagePrediction = async (base64Image) => {
    const croppedData = await cropPicture(base64Image, 300);
    const model = await getModel();
    const tensor = await convertBase64ToTensor(croppedData.base64);

    const prediction = await startPrediction(model, tensor);

    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction)
    );

    try {
      const diseaseMapping = await readDiseaseMapping();

      if (diseaseMapping) {
        const diseaseName = diseaseMapping[highestPrediction];
        const disease = await DiseaseServices.getDiseaseByName(diseaseName);

        setLoading(false);
        navigation.navigate("Result", {
          res: disease,
          img: base64Image,
        });
      } else {
        console.warn("Disease mapping data is empty.");
        setLoading(false);
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        {loading ? (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#FF8C32"
          />
        ) : null}
      </Camera>
      <TouchableOpacity onPress={takePic} style={styles.login_button}>
        <Text style={styles.login_button_text}>Start Scan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#06113C",
    flex: 1,

    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  login_button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 300,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    paddingLeft: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "#FF8C32",
  },
  login_button_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  loading: {
    height: 40,
    width: 40,
  },
});
