import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { PoseType } from "../models/PoseType";
import { COLORS } from "../design/colors";

export interface PosesFlatListProps {
  poses: PoseType[];
  onPosePress: (pose: PoseType, index: number) => void;
}

export default function PosesFlatList(props: PosesFlatListProps) {
  const { poses, onPosePress } = props;

  function renderPoseItem({ item, index }: ListRenderItemInfo<PoseType>) {
    return (
      <View style={{ width: "50%" }}>
        <TouchableOpacity onPress={() => onPosePress(item, index)}>
          <View
            style={{
              display: "flex",
              margin: 6,
              // paddingVertical: 52,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.dark,
              borderRadius: 12,
              // borderColor: "#CCC",
              // borderWidth: 2,
            }}
          >
            <View style={{ marginVertical: 32 }}>
              <Image
                source={{ uri: item.url_png }}
                style={{ width: 100, height: 100 }}
              />
            </View>

            <Text
              numberOfLines={1}
              style={{
                width: "100%",
                padding: 8,
                textAlign: "center",
                color: "white",
                borderRadius: 8,
              }}
            >
              {item.english_name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{
        paddingVertical: 32,
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 16,
      }}
      data={poses}
      renderItem={(it) => renderPoseItem(it)}
      keyExtractor={(item) => item.id + ""}
      numColumns={2}
    />
  );
}
