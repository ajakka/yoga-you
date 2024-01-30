import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../component/Header.comp";
import {
  getYogaExercises,
  getYogaPoses,
  getYogaPosesByID,
  setYogaExercises,
} from "../../data/database";
import { COLORS } from "../../design/colors";
import { NativeStackPropsOf } from "../../navigation/NativeStack";

export const ADD_EXCERCISE_SCREEN = "ADD_EXCERCISE";

type Props = NativeStackPropsOf<"ADD_EXCERCISE">;

export default function ExcerciseAddScreen(props: Props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [totalTime, setTotalTime] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [posesData, setPoses] = React.useState<ItemType<number>[]>([]);
  const [selectedPoses, setSelectedPoses] = React.useState<number[]>([]);

  React.useEffect(() => {
    console.log("selectedPoses", selectedPoses);
  }, [selectedPoses]);

  React.useEffect(() => {
    async function fetchYogaPoses() {
      const result = (await getYogaPoses()).map((it) => ({
        label: it.english_name,
        value: it.id,
      }));
      setPoses(result);
    }

    fetchYogaPoses();
  }, []);

  async function onValidatePress() {
    if (
      name.length > 0 &&
      description.length > 0 &&
      +totalTime > 0 &&
      selectedPoses.length > 0
    ) {
      const poses = await getYogaPosesByID(selectedPoses);
      const exercises = await getYogaExercises();

      exercises.push({ name, description, poses, totalTime });
      await setYogaExercises(exercises);
      props.navigation.goBack();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Add New Exercise"
        details="Start by selecting poses and adjusting the time as needed"
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
              title="VALIDATE"
              color={COLORS.dark}
              onPress={onValidatePress}
            />
          </View>
        }
      />

      <View style={{ marginHorizontal: 16, marginVertical: 32 }}>
        <Text style={{ fontSize: 15, marginBottom: 8 }}>
          Give your exercise a name:
        </Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={{ fontSize: 15, marginBottom: 8 }}>
          How about you describe it too:
        </Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={{ fontSize: 15, marginBottom: 8 }}>
          Select desired exercises:
        </Text>
        <DropDownPicker
          style={{ marginBottom: 16 }}
          open={open}
          value={selectedPoses}
          items={posesData}
          multiple
          setOpen={setOpen}
          setValue={setSelectedPoses}
          setItems={setPoses}
        />

        <Text style={{ fontSize: 15, marginBottom: 8 }}>
          Select total time to perform the exercises (in minutes):
        </Text>
        <TextInput
          style={styles.input}
          value={totalTime}
          onChangeText={setTotalTime}
          keyboardType="numeric"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "white",
  },
});
