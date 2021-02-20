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
import { ConnectivityContext } from "../../../context/ConnectivityContext";

interface Props {}

const HomeScreenView = (props: Props) => {
  const authContext = React.useContext(AuthContext);
  const connectivityContext = React.useContext(ConnectivityContext);

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={
            connectivityContext.isAgentAndBrokerIsConnected &&
            connectivityContext.isMobileAndAgentIsConnected
              ? styles.containerGreen
              : styles.containerRed
          }
        >
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

              <View
                style={{
                  marginTop: 10,
                }}
              >
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
  },

  containerRed: {
    flex: 1,
    backgroundColor: "#FFC0C0",
    alignItems: "center",
  },
  containerGreen: {
    flex: 1,
    backgroundColor: "#D7FFC0",
    alignItems: "center",
  },

  flexCenter: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
});

export default HomeScreenView;
