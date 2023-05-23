import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import "react-native-gesture-handler";
import { AuthContext } from "./context/AuthProvider";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import Home from "./screens/Home";
import NewTweet from "./screens/NewTweet";
import Notifications from "./screens/Notifications";
import Profile from "./screens/Profile";
import Search from "./screens/Search";
import Settings from "./screens/Settings";
import Tweet from "./screens/Tweet";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerBackTitleVisible: false }}
    >
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="New Tweet"
        component={NewTweet}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Tweet Screen"
        component={Tweet}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Profile Screen"
        component={Profile}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerBackTitleVisible: false }}
    >
      <Stack.Screen
        name="Login Screen"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register Screen"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home1"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    // check if user is logged in or not.
    // Check SecureStore for the user object/token

    if (Platform.OS !== "web") {
      SecureStore.getItemAsync("user")
        .then((userString) => {
          if (userString) {
            setUser(JSON.parse(userString));
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      AsyncStorage.getItem("user")
        .then((userString) => {
          if (userString) {
            setUser(JSON.parse(userString));
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <>
      {user ? (
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: true }}
          >
            <Drawer.Screen name="Home" component={HomeStackNavigator} />
            <Drawer.Screen name="Settings" component={Settings} />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AuthStackNavigator />
        </NavigationContainer>
      )}
    </>
  );
}
