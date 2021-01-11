import React from "react";
import HomeActivityView from "./HomeActivityView";
import { HubConnectionState } from "@microsoft/signalr";
import { TemperatureHumidityDto } from "../../models/TemperatureHumidityDto";
import { AgentService } from "../../services/agent.service";
import StoreService from "../../services/store.service";
import { LoginDto } from "../../models/LoginDto";

export default class HomeActivity extends React.Component {
  state = {
    temperature: 0.0,
    humidity: 0.0,
    shouldRender: false,
    shouldLogin: false,
    temperatureList: [0],
    humidityList: [0],
    timeSeries: [new Date().toLocaleTimeString().substr(0, 5)],
  };

  MAX_X = 7;

  componentDidMount() {
    StoreService.getBearerToken()
      .then((res) => {
        this.initializeAgentHubConnection();
        console.log(res);
      })
      .catch((err) => {
        this.setState({
          shouldLogin: true,
        });
      })
      .finally(() => {
        this.setState({
          shouldRender: true,
        });
      });
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
    }
  };

  onAgentMqttConnectionCallback = (isConnected: boolean) => {};

  onTemperatureHumidityReadingCallback = (topic: string, payload: string) => {
    let temperatureHumidity = JSON.parse(payload) as TemperatureHumidityDto;
    let temp = Number.parseFloat(temperatureHumidity.temperature.toFixed(1));

    this.setState({
      temperature: temp,
      humidity: temperatureHumidity.humidity,
    });
    if (this.state.temperatureList.length < this.MAX_X) {
      this.setState({
        temperatureList: [...this.state.temperatureList, temp],
        humidityList: [
          ...this.state.humidityList,
          temperatureHumidity.humidity,
        ],
        timeSeries: [
          ...this.state.timeSeries,
          new Date().toLocaleTimeString().substr(0, 5),
        ],
      });
    } else {
      let len = this.state.temperatureList.length;
      this.setState({
        temperatureList: [
          ...this.state.temperatureList.slice(len - this.MAX_X, len),
          temp,
        ],
        humidityList: [
          ...this.state.humidityList.slice(len - this.MAX_X, len),
          temperatureHumidity.humidity,
        ],
        timeSeries: [
          ...this.state.timeSeries.slice(len - this.MAX_X, len),
          new Date().toLocaleTimeString().substr(0, 5),
        ],
      });
    }
  };

  onLogin = (data: LoginDto) => {};

  render() {
    if (this.state.shouldRender) {
      return <HomeActivityView {...this.state} onLogin={this.onLogin} />;
    }
    return <></>;
  }
}
