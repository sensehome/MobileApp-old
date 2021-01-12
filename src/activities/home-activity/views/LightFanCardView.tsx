import React from "react";
import DashboardCard from "../../../components/DashboardCard";
import { faFan, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "react-native";
import { Color } from "../../../util/Colors";
import { LightFanActionContext } from "../../../context/LightFanActionContext";

const LightFanCardView = (props: {}) => {
  const actionContext = React.useContext(LightFanActionContext);
  return (
    <>
      <DashboardCard
        backgroundColor={Color.Danger}
        textColor={Color.White}
        title="Home Light"
        content={actionContext.lightStatus}
        icon={faLightbulb}
      >
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={actionContext.lightSwitch ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={actionContext.onLightSwitch}
          value={actionContext.lightSwitch}
        />
      </DashboardCard>
      <DashboardCard
        backgroundColor={Color.Danger}
        title="Home Fan"
        textColor={Color.White}
        content={actionContext.fanStatus}
        icon={faFan}
      >
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={actionContext.fanSwitch ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={actionContext.onFanSwitch}
          value={actionContext.fanSwitch}
        />
      </DashboardCard>
    </>
  );
};

export default LightFanCardView;
