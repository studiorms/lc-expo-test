import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import Home from "./screens/Home";
import NewTweet from "./screens/NewTweet";
import Profile from "./screens/Profile";
import Tweet from "./screens/Tweet";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="New Tweet" component={NewTweet} />
        <Stack.Screen name="Tweet" component={Tweet} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 60,
    //justifyContent: 'center',
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
});
