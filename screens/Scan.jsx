import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import {
  getModel,
  convertBase64ToTensor,
  startPrediction,
} from "../helpers/tensor-helper";
import { cropPicture } from "../helpers/image-helper";
import DiseaseServices from "../services/disease.services";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Scan({ navigation }) {
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const startCamera = async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === "granted" && isFocused) {
          if (cameraRef.current) {
            await cameraRef.current.resumePreview();
          }
        }
      } catch (error) {
        console.error("Error starting camera:", error);
      }
    };
    startCamera();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.pausePreview();
      }
    };
  }, [isFocused]);

  let takePic = async (upload = false) => {
    if (upload) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.canceled) {
        processImagePrediction(result.assets[0]);
      }
    } else {
      let options = {
        base64: true,
      };
      let newPhoto = await cameraRef.current?.takePictureAsync(options);
      processImagePrediction(newPhoto);
    }
  };

  const processImagePrediction = async (base64Image) => {
    setLoading(true);

    const croppedData = await cropPicture(base64Image, 300);
    const model = await getModel();
    const tensor = await convertBase64ToTensor(croppedData.base64);

    const prediction = await startPrediction(model, tensor);
    const allPredictions = getTopNPredictions(prediction);

    console.log("Predictions:", prediction);
    console.log("All Predictions", allPredictions);
    try {
      const diseaseMapping = await readDiseaseMapping();
      let diseaseArray = [];
      allPredictions.map((index) => diseaseArray.push(diseaseMapping[index]));

      if (diseaseArray.length > 0) {
        setLoading(false);

        console.log("1st Result", diseaseArray[0].diseaseName);
        console.log("2nd Result", diseaseArray[1].diseaseName);
        console.log("3rd Result", diseaseArray[2].diseaseName);

        navigation.navigate("Result", {
          result: diseaseArray,
          img: base64Image
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getTopNPredictions = (predictions) => {
    const sortedIndices = predictions
      .map((value, index) => index)
      .sort((a, b) => predictions[b] - predictions[a])
      .slice(0, 3);

    return sortedIndices;
  };

  const readDiseaseMapping = async () => {
    try {
      const filePath = `${FileSystem.documentDirectory}diseaseMapping.json`;

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

  return (
    <View style={styles.container}>
      <View style={{ height: "75%", width: "100%" }}>
        {isFocused && (
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={(ref) => (cameraRef.current = ref)}
          >
            {loading ? (
              <ActivityIndicator
                style={styles.loading}
                size="large"
                color="#FF8C32"
              />
            ) : null}
          </Camera>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => takePic(true)}
          style={styles.borderlessButton}
        >
          <FontAwesome5 name="cloud-upload-alt" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => takePic()}
          style={styles.circularButton}
        >
          <FontAwesome5 name="camera" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Diseases")}
          style={styles.borderlessButton}
        >
          <FontAwesome5 name="list-ul" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 35,
  },
  borderlessButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
    borderRadius: 35,
    marginLeft: 50,
    marginRight: 50,
  },
  circularButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "transparent",
  },
  loading: {
    height: 40,
    width: 40,
  },
});
