import React from "react";
import HomeActivityView from "./views/HomeActivityView";
import APIService from "../../services/api.service";
import StoreService from "../../services/store.service";
import { LoginDto, TokenDto } from "../../models/LoginDto";
import { HubConnectionState } from "@microsoft/signalr";
import { TemperatureHumidityDto } from "../../models/TemperatureHumidityDto";
import { AgentService } from "../../services/agent.service";
import { AuthProvider } from "../../context/AuthContext";
import { TemperatureHumidityProvider } from "../../context/TemperatureHumidityContext";

export default class HomeActivity extends React.Component {
  state = {
    temperature: 0.0,
    humidity: 0.0,
    shouldRender: false,
    isLoggedIn: false,
    isLogging: false,
    temperatureList: [0],
    humidityList: [0],
    timeSeries: [new Date().toLocaleTimeString().substr(0, 5)],
  };

  MAX_X = 7;

  componentDidMount() {
    StoreService.getBearerToken()
      .then((res) => {
        this.initializeAgentHubConnection();
        this.setState({
          isLoggedIn: true,
        });
      })
      .catch((err) => {})
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

  onLogin = (data: LoginDto) => {
    this.setState({ isLogging: true });
    APIService.login(data)
      .then((res) => {
        let token = res.data as TokenDto;
        StoreService.setBearerToken(token.bearer)
          .then((res) => {
            this.initializeAgentHubConnection();
          })
          .catch((err) => {
            alert("Something went wrong");
          })
          .finally(() => {
            this.setState({
              isLoggedIn: true,
              isLogging: false,
            });
            this.initializeAgentHubConnection();
          });
      })
      .catch((err) => {
        alert("Invalid credential");
        this.setState({
          isLogging: false,
        });
      });
  };

  onLogout = async () => {
    await AgentService.getInstance().Hub.stop();
    StoreService.remoteBearerToken()
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        this.setState({
          isLoggedIn: false,
        });
      });
  };

  render() {
    if (this.state.shouldRender) {
      return (
        <AuthProvider
          value={{
            onLogin: this.onLogin,
            onLogout: this.onLogout,
            isLogging: this.state.isLogging,
            isLoggedIn: this.state.isLoggedIn,
          }}
        >
          <TemperatureHumidityProvider
            value={{
              temperatureHistory: this.state.temperatureList,
              humiditityHistory: this.state.humidityList,
              temperature: this.state.temperature,
              humidity: this.state.humidity,
              timeSeries: this.state.timeSeries,
            }}
          >
            <HomeActivityView />
          </TemperatureHumidityProvider>
        </AuthProvider>
      );
    }
    return <></>;
  }
}

/*      TODO :
 * fan and light switching
 * connect status
 */
