import React from "react";

interface ILightFanContext {
  lightStatus: string;
  fanStatus: string;
  lightSwitch: boolean;
  fanSwitch: boolean;
  onFanSwitch: (isTurnedOn: boolean) => void;
  onLightSwitch: (isTurnedOn: boolean) => void;
}

export const LightFanActionContext = React.createContext<ILightFanContext>({
  lightStatus: "N/A",
  fanStatus: "N/A",
  lightSwitch: false,
  fanSwitch: false,
  onFanSwitch: (isOn: boolean) => {},
  onLightSwitch: (isOn: boolean) => {},
});

export const LightFanActionProvider = LightFanActionContext.Provider;

export const LightFanActionConsumer = LightFanActionContext.Consumer;
