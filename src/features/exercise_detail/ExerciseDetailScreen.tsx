import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { NativeStackPropsOf } from "../../navigation/NativeStack";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../component/Header.comp";
import { StatusBar } from "expo-status-bar";
import PosesFlatList from "../../component/PosesFlatList.comp";
import { POSE_DETAIL_SCREEN } from "../pose_detail/PoseDetailScreen";

export const EXERCISE_DETAIL_SCREEN = "EXERCISE_DETAIL";

type Props = NativeStackPropsOf<"EXERCISE_DETAIL">;

export default function ExerciseDetailScreen(props: Props) {
  const {
    route: {
      params: { name, description, poses, totalTime },
    },
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={name}
        details={description + "\n\nDurration: " + totalTime + " Minutes"}
        // extra={
        //   <View
        //     style={{
        //       width: "50%",
        //       elevation: 0,
        //       marginStart: 16,
        //       marginBottom: 16,
        //     }}
        //   >
        //     <Button
        //       title="ADD NEW EXERCISE"
        //       color={COLORS.dark}
        //       onPress={function (e) {
        //         props.navigation.navigate(ADD_EXCERCISE_SCREEN);
        //       }}
        //     />
        //   </View>
        // }
      />

      <PosesFlatList
        poses={poses}
        onPosePress={(pose, index) =>
          props.navigation.navigate(POSE_DETAIL_SCREEN, pose)
        }
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
