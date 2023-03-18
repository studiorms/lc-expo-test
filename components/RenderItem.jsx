import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatDistanceToNowStrict } from "date-fns";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RenderItem({ item: tweet }) {
  const navigation = useNavigation();

  function gotoProfile(userId) {
    navigation.navigate("Profile", { userId });
  }

  function gotoTweet(tweetId) {
    navigation.navigate("Tweet", { tweetId });
  }

  return (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => gotoProfile(tweet.user.id)}>
        <Image
          style={styles.avatar}
          source={{
            uri: tweet.user.avatar,
          }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => gotoTweet(tweet.id)}
        >
          <Text numberOfLines={1} style={styles.tweetName}>
            {tweet.user.name}
          </Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            @{tweet.user.username}
          </Text>
          <Text>&middot;</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            {formatDistanceToNowStrict(new Date(tweet.created_at))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tweetContentContainer}
          onPress={() => gotoTweet(tweet.id)}
        >
          <Text style={styles.tweetContent}>{tweet.body}</Text>
        </TouchableOpacity>
        <View style={styles.tweetEngagement}>
          <TouchableOpacity style={[styles.flexRow, { alignItems: "center" }]}>
            <EvilIcons
              name="comment"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>333</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flexRow, styles.ml4, { alignItems: "center" }]}
          >
            <EvilIcons
              name="retweet"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>123</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flexRow, styles.ml4, { alignItems: "center" }]}
          >
            <EvilIcons
              name="heart"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>456</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.flexRow, styles.ml4, { alignItems: "center" }]}
          >
            <EvilIcons
              name={Platform.OS === "ios" ? "share-apple" : "share-google"}
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tweetContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 8,
    borderRadius: 21,
  },
  flexRow: {
    flexDirection: "row",
  },
  tweetName: {
    fontWeight: "bold",
    color: "#222",
  },
  tweetHandle: {
    marginHorizontal: 8,
    color: "gray",
  },
  tweetContentContainer: {
    marginTop: 4,
  },
  tweetContent: {
    lineHeight: 20,
  },
  textGray: {
    color: "gray",
  },
  tweetEngagement: {
    flexDirection: "row",
    marginTop: 2,
  },
  ml4: {
    marginLeft: 16,
  },
});
