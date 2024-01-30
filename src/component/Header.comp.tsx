import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../design/colors";

export interface HeaderProps {
  title: string;
  details: string;
  extra?: JSX.Element;
}

export default function Header(props: HeaderProps) {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: COLORS.primary,
        borderBottomStartRadius: 16,
        borderBottomEndRadius: 16,
      }}
    >
      <Text
        style={{
          color: "white",
          marginHorizontal: 16,
          marginTop: 32,
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        {props.title}
      </Text>
      <Text
        style={{
          color: "white",
          marginHorizontal: 16,
          marginTop: 16,
          fontSize: 14,
          marginBottom: 32,
        }}
      >
        {props.details}
      </Text>

      {props.extra}
    </View>
  );
}
