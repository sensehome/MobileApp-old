import React from "react";

interface IConnectivityContext {
  isMobileAndAgentIsConnected?: boolean;
  isAgentAndBrokerIsConnected?: boolean;
}

export const ConnectivityContext = React.createContext<IConnectivityContext>(
  {}
);

export const ConnectivityProvider = ConnectivityContext.Provider;

export const ConnectivityConsumer = ConnectivityContext.Consumer;
