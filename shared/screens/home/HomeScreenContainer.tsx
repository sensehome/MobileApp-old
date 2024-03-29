import React from "react";
import HomeScreenView from "./views/HomeScreenView";
import APIService from "../../services/api.service";
import StoreService from "../../services/store.service";
import { LoginDto, TokenDto } from "../../models/LoginDto";
import { HubConnectionState } from "@microsoft/signalr";
import { TemperatureHumidityDto } from "../../models/TemperatureHumidityDto";
import { AgentService } from "../../services/agent.service";
import { AuthProvider } from "../../context/AuthContext";
import { TemperatureHumidityProvider } from "../../context/TemperatureHumidityContext";
import { LightFanActionProvider } from "../../context/LightFanActionContext";
import { RelayComponentStatusDto } from "../../models/RelayComponentDto";
import { Status } from "../../util/EnumTypes";
import { ConnectivityProvider } from "../../context/ConnectivityContext";

export default class HomeScreenContainer extends React.Component {
  state = {
    temperature: 0.0,
    humidity: 0.0,
    shouldRender: false,
    isLoggedIn: false,
    isLogging: false,
    temperatureList: [0],
    humidityList: [0],
    timeSeries: [new Date().toLocaleTimeString().substr(0, 5)],
    lightStatus: "N/A",
    fanStatus: "N/A",
    lightSwitch: false,
    fanSwitch: false,
    isMobileAndAgentIsConnected: false,
    isAgentAndBrokerIsConnected: false,
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
          AgentService.getInstance().Hub.onclose((err) => {
            this.autoReconnectAgent();
          });
          this.setState({
            isAgentAndBrokerIsConnected: true,
            isMobileAndAgentIsConnected: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  autoReconnectAgent = () => {
    setTimeout(this.initializeAgentHubConnection, 5000);
  };

  agentHubSubsriptions = () => {
    let agentHub = AgentService.getInstance().Hub;

    let callbackMap = [
      {
        topic: "home/temperature-humidity",
        handler: this.onTemperatureHumidityReadingCallback,
      },
      {
        topic: "home/living-room/light/status",
        handler: this.onLivingRoomLightStatusReadingCallback,
      },
      {
        topic: "home/living-room/fan/status",
        handler: this.onLivingRoomFanStatusReadingCallback,
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

  onAgentMqttConnectionCallback = (isConnected: boolean) => {
    if (isConnected) {
      if (!this.state.isAgentAndBrokerIsConnected) {
        this.setState({
          isAgentAndBrokerIsConnected: true,
        });
      }
    } else {
      this.setState({
        isAgentAndBrokerIsConnected: false,
      });
    }
  };

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

  onLivingRoomLightStatusReadingCallback = (topic: string, payload: string) => {
    let componentStatus = JSON.parse(payload) as RelayComponentStatusDto;
    this.setState({
      lightSwitch: componentStatus.status === Status.ON,
      lightStatus: componentStatus.status,
    });
  };

  onLivingRoomFanStatusReadingCallback = (topic: string, payload: string) => {
    let componentStatus = JSON.parse(payload) as RelayComponentStatusDto;
    this.setState({
      fanSwitch: componentStatus.status === Status.ON,
      fanStatus: componentStatus.status,
    });
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

  handleFanSwitch = (isOn: boolean) => {
    let topic = "home/living-room/fan/status/change";
    let payload = JSON.stringify({
      status: this.state.fanSwitch ? "OFF" : "ON",
    });
    AgentService.getInstance().Hub.invoke(
      AgentService.RpcInvokePublish,
      topic,
      payload
    );
  };

  handleLightSwitch = (isOn: boolean) => {
    let topic = "home/living-room/light/status/change";
    let payload = JSON.stringify({
      status: this.state.lightSwitch ? "OFF" : "ON",
    });
    AgentService.getInstance().Hub.invoke(
      AgentService.RpcInvokePublish,
      topic,
      payload
    );
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
            <LightFanActionProvider
              value={{
                lightStatus: this.state.lightStatus,
                fanStatus: this.state.fanStatus,
                lightSwitch: this.state.lightSwitch,
                fanSwitch: this.state.fanSwitch,
                onFanSwitch: this.handleFanSwitch,
                onLightSwitch: this.handleLightSwitch,
              }}
            >
              <ConnectivityProvider
                value={{
                  isMobileAndAgentIsConnected: this.state
                    .isMobileAndAgentIsConnected,
                  isAgentAndBrokerIsConnected: this.state
                    .isAgentAndBrokerIsConnected,
                }}
              >
                <HomeScreenView />
              </ConnectivityProvider>
            </LightFanActionProvider>
          </TemperatureHumidityProvider>
        </AuthProvider>
      );
    }
    return <></>;
  }
}
