import { View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "./NativeStack";

import { COLORS } from "../design/colors";
import { Ionicons } from "@expo/vector-icons";

import DiscoverScreen, {
  DISCOVER_SCREEN,
} from "../features/discover/DiscoverScreen";
import ExerciseScreen, {
  EXERCISE_SCREEN,
} from "../features/exercise/ExerciseScreen";

export const TAB_STACK_ID = "TAB_STACK";

export type TabStackPropsOf<T extends keyof TabStackParamList> =
  NativeStackScreenProps<TabStackParamList, T>;

export type TabStackParamList = RootStackParamList & {
  DISCOVER: undefined;
  EXERCISE: undefined;
};

const BottomTab = createBottomTabNavigator();

export function TabStackNavigator() {
  function renderTabBarIcon({ route, focused, color, size }) {
    let iconName;
    if (route.name === DISCOVER_SCREEN) {
      iconName = focused ? "compass" : "compass-outline";
    } else if (route.name === EXERCISE_SCREEN) {
      iconName = focused ? "list" : "list-outline";
    }

    if (focused) {
      return (
        <View
          style={{
            backgroundColor: COLORS.primary,
            paddingHorizontal: 16,
            paddingVertical: 2,
            borderRadius: 32,
          }}
        >
          <Ionicons name={iconName} size={size} color={color} />
        </View>
      );
    } else {
      {
        return <Ionicons name={iconName} size={size} color={color} />;
      }
    }
  }

  return (
    <BottomTab.Navigator
      id={TAB_STACK_ID}
      screenOptions={function ({ route }) {
        return {
          tabBarIcon: function ({ focused, color, size }) {
            return renderTabBarIcon({ route, focused, color, size });
          },

          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: COLORS.primary,
          tabBarShowLabel: false,
          tabBarStyle: {
            // position: "absolute",
            // bottom: 16,
            // end: 16,
            // start: 16,
            elevation: 0,
            height: 64,
            // borderRadius: 16,
            borderTopStartRadius: 16,
            borderTopEndRadius: 16,
            // backgroundColor: COLORS.primary,
            backgroundColor: "white",
          },
        };
      }}
    >
      <BottomTab.Screen name={EXERCISE_SCREEN} component={ExerciseScreen} />
      <BottomTab.Screen name={DISCOVER_SCREEN} component={DiscoverScreen} />
    </BottomTab.Navigator>
  );
}
