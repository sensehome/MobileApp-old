import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart as LineChartKit } from "react-native-chart-kit";
import { Color } from "../util/Colors";

interface Props {
  data: any[];
  labels: string[];
  name?: string;
  yAxisLabel?: string;
  yAxisSuffex?: string;
  backgroundColor?: Color;
}

export default function LineChart(props: Props) {
  return (
    <View>
      <Text style={{ textAlign: "center" }}>{props.name}</Text>
      <LineChartKit
        data={{
          labels: props.labels,
          datasets: [
            {
              data: props.data,
            },
          ],
        }}
        width={Dimensions.get("window").width - 30} // from react-native
        height={220}
        yAxisLabel={props.yAxisLabel}
        yAxisSuffix={props.yAxisSuffex}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: props.backgroundColor
            ? props.backgroundColor
            : "#fb8c00",
          backgroundGradientTo: props.backgroundColor
            ? props.backgroundColor
            : "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
