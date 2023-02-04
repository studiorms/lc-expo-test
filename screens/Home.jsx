import React from "react";
import { Button, Text, View } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="New Tweet"
        onPress={() => navigation.navigate("New Tweet")}
      />
      <Button title="Tweet" onPress={() => navigation.navigate("Tweet")} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
    </View>
  );
}
