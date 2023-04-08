import React from "react";
import { Button, Text, View } from "react-native";

export default function Register({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the register screen</Text>
      <Button
        onPress={() => navigation.navigate("Login Screen")}
        title="Go to Login Screen"
      />
    </View>
  );
}
