import { HubConnectionState } from "@microsoft/signalr";
import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import LineChart from "../../components/LineChart";
import { TemperatureHumidityDto } from "../../models/TemperatureHumidityDto";
import { AgentService } from "../../services/agent.service";

export default class HomeActivity extends React.Component {
  state = {
    temperature: 0.0,
    humdity: 0.0,

    temperaureList: [0],
    humidityList: [],
    timeSeries: [new Date().toLocaleTimeString().substr(0, 5)],
  };

  MAX_X = 7;

  componentDidMount() {
    this.initializeAgentHubConnection();
  }

  initializeAgentHubConnection = () => {
    if (
      AgentService.getInstance().Hub.state === HubConnectionState.Disconnected
    ) {
      AgentService.getInstance()
        .Hub.start()
        .then(() => {
          this.agentHubSubsriptions();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  agentHubSubsriptions = () => {
    let agentHub = AgentService.getInstance().Hub;

    let callbackMap = [
      {
        topic: "home/temperature-humidity",
        handler: this.onTemperatureHumidityReadingCallback,
      },
    ];

    if (agentHub.state === HubConnectionState.Connected) {
      agentHub.on(
        AgentService.RpcHubConnection,
        this.onAgentMqttConnectionCallback
      );
      agentHub.on(AgentService.RpcHubBroadcast, (topic, payload) => {
        let callback = callbackMap.find((c) => c.topic === topic);
        if (callback) {
          callback.handler(topic, payload);
        }
      });
    } else {
      alert("Agent is not connected with briker");
    }
  };

  onAgentMqttConnectionCallback = (isConnected: boolean) => {
    alert(`Agent is Connected : ${isConnected}`);
  };

  onTemperatureHumidityReadingCallback = (topic: string, payload: string) => {
    let temperatureHumidity = JSON.parse(payload) as TemperatureHumidityDto;
    let temp = Number.parseFloat(temperatureHumidity.temperature.toFixed(2));

    this.setState({
      temperature: temp,
      humdity: temperatureHumidity.humidity,
    });
    if (this.state.temperaureList.length < this.MAX_X) {
      this.setState({
        temperaureList: [...this.state.temperaureList, temp],
        timeSeries: [
          ...this.state.timeSeries,
          new Date().toLocaleTimeString().substr(0, 5),
        ],
      });
    } else {
      let len = this.state.temperaureList.length;
      this.setState({
        temperaureList: [
          ...this.state.temperaureList.slice(len - this.MAX_X, len),
          temp,
        ],
        timeSeries: [
          ...this.state.timeSeries.slice(len - this.MAX_X, len),
          new Date().toLocaleTimeString().substr(0, 5),
        ],
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <Text>Temperaure : {this.state.temperature} °C</Text>
        <Text>Humidity : {this.state.humdity} %</Text>
        <LineChart
          name="Realtime Temperature"
          data={this.state.temperaureList}
          labels={this.state.timeSeries}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
