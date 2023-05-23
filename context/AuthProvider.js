import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useState } from "react";
import { Platform } from "react-native";
import axiosConfig from "../helpers/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        isLoading,
        login: (email, password) => {
          setIsLoading(true);
          axiosConfig
            .post("/login", {
              email,
              password,
              device_name: "mobile",
            })
            .then((response) => {
              const userResponse = {
                token: response.data.token,
                id: response.data.user.id,
                name: response.data.user.name,
                username: response.data.user.username,
                email: response.data.user.email,
                avatar: response.data.user.avatar,
              };

              setUser(userResponse);
              setError(null);
              if (Platform.OS !== "web") {
                SecureStore.setItemAsync("user", JSON.stringify(userResponse));
              } else {
                AsyncStorage.setItem("user", JSON.stringify(userResponse));
              }

              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error.response);
              setError(error.response.data.message);
              setIsLoading(false);
            });
        },
        logout: () => {
          setIsLoading(true);
          axiosConfig.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${user.token}`;
          axiosConfig
            .post("/logout")
            .then((response) => {
              setUser(null);
              if (Platform.OS !== "web") {
                SecureStore.deleteItemAsync("user");
              } else {
                AsyncStorage.removeItem("user");
              }
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setUser(null);
              if (Platform.OS !== "web") {
                SecureStore.deleteItemAsync("user");
              } else {
                AsyncStorage.removeItem("user");
              }
              setError(error.response.data.message);
              setIsLoading(false);
            });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
