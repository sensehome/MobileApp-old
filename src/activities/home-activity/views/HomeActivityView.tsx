import React from "react";
import LightFanCardView from "./LightFanCardView";
import TemperatureHumidityCardView from "./TemperatureHumidityCardView";
import TemperatureHumiditityChartView from "./TemperatureHumidyChartView";
import LoginModal from "../../../components/LoginModal";
import { LoginDto } from "../../../models/LoginDto";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { AuthContext } from "../../../context/AuthContext";

interface Props {}

export default function HomeActivityView(props: Props) {
  const authContext = React.useContext(AuthContext);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar />

          <LoginModal />
          {authContext.isLoggedIn ? (
            <>
              <View>
                <View style={styles.flexCenter}>
                  <LightFanCardView />
                </View>

                <View style={styles.flexCenter}>
                  <TemperatureHumidityCardView />
                </View>
              </View>

              <View>
                <TemperatureHumiditityChartView />
              </View>

              <View
                style={{
                  width: "100%",
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  marginBottom: 30,
                }}
              >
                <Button
                  title="Logout"
                  onPress={(e) => {
                    e.preventDefault();
                    authContext.onLogout();
                  }}
                />
              </View>
            </>
          ) : (
            <></>
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

  flexCenter: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
});
