import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import React from "react";
import { NativeStackPropsOf } from "../../navigation/NativeStack";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../component/Header.comp";
import { StatusBar } from "expo-status-bar";

export const POSE_DETAIL_SCREEN = "POSE_DETAIL";

type Props = NativeStackPropsOf<"POSE_DETAIL">;

export default function PoseDetailScreen(props: Props) {
  const pose = props.route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={pose.english_name} details={pose.sanskrit_name_adapted} />

      <ScrollView style={styles.scrollContainer}>
        {/* <Text style={styles.header}>{pose.english_name}</Text> */}

        <View style={styles.imageContainer}>
          <Image source={{ uri: pose.url_png }} style={styles.image} />
          {/* Include additional images or carousel component if needed */}
        </View>

        <View style={styles.namesSection}>
          <Text style={styles.sanskritName}>{pose.sanskrit_name}</Text>
          <Text style={styles.translationName}>{pose.translation_name}</Text>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.description}>{pose.pose_description}</Text>
          <Text style={styles.benefits}>{pose.pose_benefits}</Text>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailText}>
            Difficulty: {pose.difficulty_level}
          </Text>
          <Text style={styles.detailText}>Category: {pose.category_name}</Text>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  namesSection: {
    alignItems: "center",
    marginVertical: 10,
  },
  sanskritName: {
    fontSize: 18,
    fontStyle: "italic",
  },
  translationName: {
    fontSize: 16,
    color: "#707070",
    paddingHorizontal: 16,
  },
  descriptionSection: {
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
  },
  benefits: {
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 10,
  },
  detailsSection: {
    marginTop: 10,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  detailText: {
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
});
