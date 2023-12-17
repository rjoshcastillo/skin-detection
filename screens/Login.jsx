import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStore from "../utils/appStore";
import Toast from "react-native-toast-message";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const setNurseid = useStore((state) => state.setNurseid);

  const userLogin = async () => {
    const res = axios.post("login", {
      username,
      password,
    });
    const result = await res;

    if (res) {
      Toast.show({
        type: "success",
        text1: "Login Success!",
      });
      const { data } = result;
      console.log(data);
      console.log(data.nurse_id);
      setNurseid(data.nurse_id);
      
    } else {
      console.log("error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>COVAXSYS</Text>
      <Text style={[styles.login_text, { marginBottom: 20 }]}>
        Health Worker Login
      </Text>
      <View style={styles.login_box}>
        <Text style={styles.login_text}>Username</Text>
        <TextInput
          name="empid"
          value={username}
          onChangeText={setUsername}
          style={styles.login_input}
        />

        <Text style={styles.login_text}>Password</Text>
        <TextInput
          name="pass"
          type="password"
          secureTextEntry={true}
          onChangeText={setPassword}
          style={styles.login_input}
        />
        <TouchableOpacity onPress={userLogin} style={styles.login_button}>
          <Text style={styles.login_button_text}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#06113C",
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#EEEEEE",
    textTransform: "uppercase",
  },
  login_box: {
    display: "flex",
    height: 300,
    width: 300,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  login_text: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
    color: "#FF8C32",
    textTransform: "uppercase",
  },
  login_input: {
    height: 60,
    width: 300,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
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
});
