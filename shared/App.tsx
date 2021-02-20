import React from "react";
import HomeScreenContainer from "./screens/home/HomeScreenContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreenContainer from "./screens/login/LoginScreenContainer";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreens = () => (
  <MainStack.Navigator initialRouteName="Login">
    <MainStack.Screen
      name="Home"
      options={{
        headerShown: false,
      }}
      component={HomeScreenContainer}
    />
    <MainStack.Screen name="Login" component={LoginScreenContainer} />
  </MainStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackScreens} />
        {/* use full screens modal2 */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
