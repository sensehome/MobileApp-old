import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text } from "react-native";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-native-elements";
import { Color } from "../util/Colors";

interface Props {
  title?: string;
  content?: string;
  icon: IconDefinition;
  backgroundColor?: Color;
  textColor?: Color;
}

export default function DashboardCard(props: Props) {
  return (
    <Card
      containerStyle={{
        backgroundColor: props.backgroundColor,
        borderColor: props.backgroundColor,
        borderRadius: 10,
        width: 150,
      }}
    >
      <Card.Title
        style={{ color: props.textColor ? props.textColor : Color.Black }}
      >
        {props.title}
      </Card.Title>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon
          style={{
            marginTop: 5,
            color: props.textColor ? props.textColor : Color.Black,
          }}
          icon={props.icon}
          size={24}
        />
        <Text
          style={{
            color: props.textColor ? props.textColor : Color.Black,
            fontSize: 25,
          }}
        >
          {props.content}
        </Text>
      </View>
    </Card>
  );
}
