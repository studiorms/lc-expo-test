import { EvilIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const renderItem = ({ item }) => (
  <View style={{ marginVertical: 20 }}>
    <Text>{item.title}</Text>
  </View>
);

const ProfileHeader = () => (
  <View style={styles.container}>
    <Image
      style={styles.backgroundImage}
      source={{
        uri: "https://images.unsplash.com/photo-1674920677763-0488c7c75a98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
      }}
    />
    <View style={styles.avatarContainer}>
      <Image
        style={styles.avatar}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.nameContainer}>
      <Text style={styles.profileName}>Robert Smith</Text>
      <Text style={styles.profileHandle}>@studiorms</Text>
    </View>
    <View style={styles.profileContainer}>
      <Text style={styles.profileContainerText}>Best of the best</Text>
    </View>

    <View style={styles.locationContainer}>
      <EvilIcons name="location" size={24} color="gray" />
      <Text style={styles.textGray}>Washington State</Text>
    </View>

    <View style={styles.linkContainer}>
      <TouchableOpacity
        style={styles.linkItem}
        onPress={() => Linking.openURL("https://www.studiorms.com")}
      >
        <EvilIcons name="link" size={24} color="gray" />
        <Text style={styles.linkColor}>studiorms.com</Text>
      </TouchableOpacity>
      <View style={[styles.linkItem, styles.ml4]}>
        <EvilIcons name="calendar" size={24} color="gray" />
        <Text style={styles.textGray}>Joined March 2009</Text>
      </View>
    </View>
    <View style={styles.followContainer}>
      <View style={styles.followItem}>
        <Text style={styles.followItemNumber}>509</Text>
        <Text style={styles.followItemLabel}>Following</Text>
      </View>
      <View style={styles.followItem}>
        <Text style={styles.followItemNumber}>2,345</Text>
        <Text style={styles.followItemLabel}>Follower</Text>
      </View>
    </View>
    <View style={styles.separator} />
  </View>
);

export default function Profile() {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28b1",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f62",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d73",
      title: "Third Item",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28b4",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f65",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d76",
      title: "Third Item",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28b7",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f68",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d79",
      title: "Third Item",
    },
  ];
  return (
    <FlatList
      style={styles.container}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={ProfileHeader}
    />
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: 800,
    height: 120,
  },
  textGray: {
    color: "gray",
  },
  ml4: {
    marginLeft: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    marginTop: -34,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
  },
  followButton: {
    backgroundColor: "#0f1418",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  nameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  profileHandle: {
    color: "gray",
    marginTop: 1,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 22,
  },
  profileContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  profileContainerText: {
    lineHeight: 22,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 12,
  },
  linkContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 4,
  },
  linkColor: {
    color: "#1d9bf1",
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  followContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  followItem: {
    flexDirection: "row",
    marginRight: 12,
  },
  followItemNumber: {
    fontWeight: "bold",
  },
  followItemLabel: {
    marginLeft: 4,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
});
