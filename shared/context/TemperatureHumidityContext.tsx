import React from "react";

interface ITemperatureHumidity {
  temperature: number;
  humidity: number;
  temperatureHistory: Array<number>;
  humiditityHistory: Array<number>;
  timeSeries: Array<string>;
}

export const TemperatureHumidityContext = React.createContext<ITemperatureHumidity>(
  {
    temperature: 0.0,
    humidity: 0.0,
    temperatureHistory: [],
    humiditityHistory: [],
    timeSeries: [],
  }
);

export const TemperatureHumidityProvider = TemperatureHumidityContext.Provider;

export const TemperatureHumidityConsumer = TemperatureHumidityContext.Consumer;
