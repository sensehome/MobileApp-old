import React from "react";
import DashboardCard from "../../components/DashboardCard";
import LineChart from "../../components/LineChart";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  faFan,
  faLightbulb,
  faThermometerHalf,
  faTint,
} from "@fortawesome/free-solid-svg-icons";
import { Color } from "../../util/Colors";

interface Props {
  temperature: number;
  humidity: number;
  temperatureList: number[];
  humidityList: number[];
  timeSeries: string[];
}

export default function HomeActivityView(props: Props) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar />
          <View>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <DashboardCard
                backgroundColor={Color.Danger}
                textColor={Color.White}
                title="Home Light"
                content={`OFF`}
                icon={faLightbulb}
              />
              <DashboardCard
                backgroundColor={Color.Danger}
                title="Home Fan"
                textColor={Color.White}
                content={`OFF`}
                icon={faFan}
              />
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <DashboardCard
                backgroundColor={Color.Warning}
                textColor={Color.White}
                title="Temperature"
                content={`${props.temperature}°C`}
                icon={faThermometerHalf}
              />
              <DashboardCard
                backgroundColor={Color.Primary}
                title="Humidity"
                textColor={Color.White}
                content={`${props.humidity}%`}
                icon={faTint}
              />
            </View>
          </View>
          <View
            style={{
              margin: 5,
            }}
          >
            <LineChart
              name="Realtime Temperature"
              yAxisSuffex="°C"
              data={props.temperatureList}
              labels={props.timeSeries}
            />
          </View>
          <View
            style={{
              margin: 5,
            }}
          >
            <LineChart
              name="Realtime Humidity"
              backgroundColor={Color.Primary}
              data={props.humidityList}
              labels={props.timeSeries}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
