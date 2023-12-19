import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scan from "./screens/Scan";
import Diseases from "./screens/Diseases";
import Toast from "react-native-toast-message";
import Info from "./screens/Info";
import Result from "./screens/Result";

const Stack = createNativeStackNavigator();

export default function App() {
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
