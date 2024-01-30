import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeScreen, { HOME_SCREEN } from "../features/home/HomeScreen";
import ExcerciseAddScreen, {
  ADD_EXCERCISE_SCREEN,
} from "../features/exercise_add/ExcerciseAddScreen";
import ExerciseDetailScreen, {
  EXERCISE_DETAIL_SCREEN,
} from "../features/exercise_detail/ExerciseDetailScreen";
import PoseDetailScreen, {
  POSE_DETAIL_SCREEN,
} from "../features/pose_detail/PoseDetailScreen";

import { Exercise } from "../models/Exercise";
import { PoseType } from "../models/PoseType";

export const NATIVE_STACK_ID = "NATIVE_STACK";

export type NativeStackPropsOf<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootStackParamList = {
  HOME: undefined;
  ADD_EXCERCISE: undefined;
  EXERCISE_DETAIL: Exercise;
  POSE_DETAIL: PoseType;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function NativeStackNavigator() {
  return (
    <Stack.Navigator
      id={NATIVE_STACK_ID}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />

      <Stack.Screen
        name={ADD_EXCERCISE_SCREEN}
        component={ExcerciseAddScreen}
      />

      <Stack.Screen
        name={EXERCISE_DETAIL_SCREEN}
        component={ExerciseDetailScreen}
      />

      <Stack.Screen name={POSE_DETAIL_SCREEN} component={PoseDetailScreen} />
    </Stack.Navigator>
  );
}
