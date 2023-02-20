import { Entypo, EvilIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axiosConfig from "../helpers/axiosConfig";

export default function Tweet({ route, navigation }) {
  const [tweet, setTweet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTweet();
  }, []);

  function getTweet() {
    axiosConfig
      .get(`/tweets/${route.params.tweetId}`)
      .then((response) => {
        setTweet(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }

  function gotoProfile(userId) {
    navigation.navigate("Profile", { userId });
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="gray" />
      ) : (
        <>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.flexRow}
              onPress={() => gotoProfile(tweet.user.id)}
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: "https://reactnative.dev/img/tiny_logo.png",
                }}
              />
              <View>
                <Text numberOfLines={1} style={styles.tweetName}>
                  {tweet.user.name}
                </Text>
                <Text numberOfLines={1} style={styles.tweetHandle}>
                  @{tweet.user.username}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={styles.tweetContentContainer}>
            <Text style={styles.tweetContent}>{tweet.body}</Text>
            <View style={styles.tweetTimestampContainer}>
              <Text style={styles.tweetTimestampText}>
                {format(new Date(tweet.created_at), "h:mm a")}
              </Text>
              <Text style={styles.tweetTimestampText}>&middot;</Text>
              <Text style={styles.tweetTimestampText}>
                {format(new Date(tweet.created_at), "d MMM.yy")}
              </Text>
              <Text style={styles.tweetTimestampText}>&middot;</Text>
              <Text style={[styles.tweetTimestampText, styles.linkColor]}>
                Twitter for iPhone
              </Text>
            </View>
          </View>
          <View style={styles.tweetEngagement}>
            <View style={styles.flexRow}>
              <Text style={styles.tweetEngagementNumber}>333</Text>
              <Text style={styles.tweetEngagementLabel}>Retweets</Text>
            </View>
            <View style={[styles.flexRow, styles.ml4]}>
              <Text style={styles.tweetEngagementNumber}>123</Text>
              <Text style={styles.tweetEngagementLabel}>Quote Tweets</Text>
            </View>
            <View style={[styles.flexRow, styles.ml4]}>
              <Text style={styles.tweetEngagementNumber}>456</Text>
              <Text style={styles.tweetEngagementLabel}>Likes</Text>
            </View>
          </View>
          <View style={[styles.tweetEngagement, styles.spaceAround]}>
            <TouchableOpacity>
              <EvilIcons name="comment" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <EvilIcons name="retweet" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <EvilIcons name="heart" size={32} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity>
              <EvilIcons
                name={Platform.OS === "ios" ? "share-apple" : "share-google"}
                size={22}
                color="gray"
                style={{ marginRight: 2 }}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  linkColor: {
    color: "#1d9bf1",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 25,
  },
  tweetName: {
    fontWeight: "bold",
    color: "#222",
  },
  tweetHandle: {
    marginTop: 6,
    color: "gray",
  },
  tweetContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
    marginTop: 4,
  },
  tweetContent: {
    fontSize: 20,
    lineHeight: 30,
  },
  tweetEngagement: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
  },
  tweetEngagementNumber: {
    fontWeight: "bold",
  },
  tweetEngagementLabel: {
    color: "gray",
    marginLeft: 6,
  },
  ml4: {
    marginLeft: 16,
  },
  spaceAround: {
    justifyContent: "space-around",
  },
  tweetTimestampContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  tweetTimestampText: {
    color: "gray",
    marginRight: 6,
  },
});
