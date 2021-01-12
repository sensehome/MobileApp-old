import React from "react";
import DashboardCard from "../../components/DashboardCard";
import LineChart from "../../components/LineChart";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Switch,
  Button,
} from "react-native";
import {
  faFan,
  faLightbulb,
  faThermometerHalf,
  faTint,
} from "@fortawesome/free-solid-svg-icons";
import { Color } from "../../util/Colors";
import LoginModal from "../../components/LoginModal";
import { LoginDto } from "../../models/LoginDto";

interface Props {
  temperature: number;
  humidity: number;
  temperatureList: number[];
  humidityList: number[];
  timeSeries: string[];
  onLogin: (data: LoginDto) => void;
  onLogout: () => void;
  shouldLogin?: boolean;
  isLogging?: boolean;
}

export default function HomeActivityView(props: Props) {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar />
          <LoginModal
            show={props.shouldLogin}
            onLogin={props.onLogin}
            isLogging={props.isLogging}
          />
          {props.shouldLogin ? (
            <></>
          ) : (
            <View>
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
                  >
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </DashboardCard>
                  <DashboardCard
                    backgroundColor={Color.Danger}
                    title="Home Fan"
                    textColor={Color.White}
                    content={`OFF`}
                    icon={faFan}
                  >
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </DashboardCard>
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
                  flex: 1,
                  alignItems: "center",
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
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <LineChart
                  name="Realtime Humidity"
                  backgroundColor={Color.Primary}
                  data={props.humidityList}
                  labels={props.timeSeries}
                />
              </View>

              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginBottom: 30,
                }}
              >
                <Button
                  title="Logout"
                  onPress={(e) => {
                    e.preventDefault();
                    props.onLogout();
                  }}
                />
              </View>
            </View>
          )}
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
