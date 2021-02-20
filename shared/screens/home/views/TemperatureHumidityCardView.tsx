import React from "react";
import DashboardCard from "../../../components/DashboardCard";
import { Color } from "../../../util/Colors";
import { faThermometerHalf, faTint } from "@fortawesome/free-solid-svg-icons";
import { TemperatureHumidityConsumer } from "../../../context/TemperatureHumidityContext";

const TemperatureHumidityCardView = (props: {}) => {
  return (
    <TemperatureHumidityConsumer>
      {(context) => (
        <>
          <DashboardCard
            backgroundColor={Color.Warning}
            textColor={Color.White}
            title="Temperature"
            content={`${context.temperature}°C`}
            icon={faThermometerHalf}
          />
          <DashboardCard
            backgroundColor={Color.Primary}
            title="Humidity"
            textColor={Color.White}
            content={`${context.humidity}%`}
            icon={faTint}
          />
        </>
      )}
    </TemperatureHumidityConsumer>
  );
};

export default TemperatureHumidityCardView;
