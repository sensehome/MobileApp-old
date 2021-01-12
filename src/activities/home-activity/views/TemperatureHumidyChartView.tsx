import React from "react";
import LineChart from "../../../components/LineChart";
import { View } from "react-native";
import { Color } from "../../../util/Colors";
import { TemperatureHumidityConsumer } from "../../../context/TemperatureHumidityContext";

const TemperatureHumiditityChartView = (props: {}) => {
  return (
    <TemperatureHumidityConsumer>
      {(context) => {
        return (
          <>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <LineChart
                name="Realtime Temperature"
                yAxisSuffex="°C"
                data={context.temperatureHistory}
                labels={context.timeSeries}
              />
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <LineChart
                name="Realtime Humidity"
                backgroundColor={Color.Primary}
                data={context.humiditityHistory}
                labels={context.timeSeries}
              />
            </View>
          </>
        );
      }}
    </TemperatureHumidityConsumer>
  );
};

export default TemperatureHumiditityChartView;
