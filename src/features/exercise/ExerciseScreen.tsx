import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  ListRenderItemInfo,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../component/Header.comp";
import { COLORS } from "../../design/colors";
import { PoseType } from "../../models/PoseType";
import { getYogaExercises } from "../../data/database";
import { ADD_EXCERCISE_SCREEN } from "../exercise_add/ExcerciseAddScreen";
import { useIsFocused } from "@react-navigation/native";
import { TabStackPropsOf } from "../../navigation/TabStack";
import { NATIVE_STACK_ID } from "../../navigation/NativeStack";
import { Exercise } from "../../models/Exercise";
import { EXERCISE_DETAIL_SCREEN } from "../exercise_detail/ExerciseDetailScreen";

export const EXERCISE_SCREEN = "EXERCISE";

type Props = TabStackPropsOf<"EXERCISE">;

export default function ExerciseScreen(props: Props) {
  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    async function fetchYogaPoses() {
      const result = await getYogaExercises();
      setExercises(result);
    }

    if (isFocused) {
      fetchYogaPoses();
    }
  }, [isFocused]);

  function renderPoseItem({ item }: ListRenderItemInfo<Exercise>) {
    return (
      <View>
        <TouchableOpacity
          onPress={(e) =>
            props.navigation.navigate(EXERCISE_DETAIL_SCREEN, item)
          }
        >
          <View
            style={{
              display: "flex",
              margin: 6,
              // alignItems: "center",
              // justifyContent: "center",
              backgroundColor: COLORS.dark,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 16,
                marginTop: 8,
                color: "white",
              }}
            >
              Exercises{" "}
              <Text style={{ fontSize: 12 }}>
                ({item.poses.length} in total)
              </Text>
            </Text>
            {item.poses.map((it) => (
              <Text
                key={it.id}
                numberOfLines={1}
                style={{
                  width: "100%",
                  marginHorizontal: 16,
                  // textAlign: "center",
                  color: "white",
                  borderRadius: 8,
                }}
              >
                {" "}
                - {it.english_name}
              </Text>
            ))}

            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 16,
                marginVertical: 8,
                color: "white",
              }}
            >
              Total time: {item.totalTime} minutes
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Exercise"
        details="Make your own exercise by selecting from a plethera of available poses and adjusting the time as needed"
        extra={
          <View
            style={{
              width: "50%",
              elevation: 0,
              marginStart: 16,
              marginBottom: 16,
            }}
          >
            <Button
              title="ADD NEW EXERCISE"
              color={COLORS.dark}
              onPress={function (e) {
                props.navigation.navigate(ADD_EXCERCISE_SCREEN);
              }}
            />
          </View>
        }
      />

      {exercises.length > 0 ? (
        <FlatList
          contentContainerStyle={{
            paddingVertical: 32,
            paddingHorizontal: 16,
          }}
          data={exercises}
          renderItem={(it) => renderPoseItem(it)}
          keyExtractor={(item, index) => item.totalTime + "_" + index}
        />
      ) : (
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 64,
            marginHorizontal: 32,
          }}
        >
          You have not created any exercises yet, start a new exercise by
          clicking on the button up top
        </Text>
      )}
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
