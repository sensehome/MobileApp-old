import React from "react";
import DashboardCard from "../../../components/DashboardCard";
import { faFan, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "react-native";

import { Color } from "../../../util/Colors";

const LightFanCardView = (props: {}) => {
  return (
    <>
      <DashboardCard
        backgroundColor={Color.Danger}
        textColor={Color.White}
        title="Home Light"
        content={`OFF`}
        icon={faLightbulb}
      >
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          // onValueChange={toggleSwitch}
          // value={isEnabled}
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
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          // onValueChange={toggleSwitch}
          // value={isEnabled}
        />
      </DashboardCard>
    </>
  );
};

export default LightFanCardView;
