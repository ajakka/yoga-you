import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getYogaPoses } from "../../data/database";
import { PoseType } from "../../models/PoseType";
import { TabStackPropsOf } from "../../navigation/TabStack";
import { COLORS } from "../../design/colors";
import Header from "../../component/Header.comp";
import PosesFlatList from "../../component/PosesFlatList.comp";
import { POSE_DETAIL_SCREEN } from "../pose_detail/PoseDetailScreen";

export const DISCOVER_SCREEN = "DISCOVER";

type Props = TabStackPropsOf<"DISCOVER">;

export default function DiscoverScreen(props: Props) {
  const [poses, setPoses] = React.useState<PoseType[]>([]);

  React.useEffect(() => {
    async function fetchYogaPoses() {
      const result = await getYogaPoses();
      setPoses(result);
    }

    fetchYogaPoses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Discover"
        details="Find out about all the available exercises and instruction on how to perform them on this comprehensive list"
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
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "white",
  },
});
