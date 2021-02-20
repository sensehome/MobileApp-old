import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View } from "react-native";
import { Input, Button } from "react-native-elements";

const LoginScreenView = (props: any) => {
  const usernameRef = React.createRef<Input>();
  const passwordRef = React.createRef<Input>();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const checkIfFormDataIsValid = (): boolean => {
    //TODO use username and password validator
    if (username === "") {
      usernameRef.current?.shake();
      return false;
    }
    if (password === "") {
      passwordRef.current?.shake();
      return false;
    }
    return true;
  };

  const handleLoginClick = () => {
    if (!checkIfFormDataIsValid()) {
      return;
    }
    //TODO: call server API to authenticate user
    props.navigation.replace("Home");
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ width: 400 }}>
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Authenticate to SenseHome
          </Text>
        </View>
        <View>
          <Input
            placeholder="username"
            label="User Name"
            ref={usernameRef}
            onChangeText={(value) => {
              setUsername(value);
            }}
            leftIcon={<Icon name="envelope-o" size={20} color="black" />}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Input
            ref={passwordRef}
            placeholder="Password"
            label="Password"
            secureTextEntry={true}
            onChangeText={(value) => {
              setPassword(value);
            }}
            leftIcon={<Icon name="lock" size={20} color="black" />}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Login"
            buttonStyle={{ paddingTop: 12, paddingBottom: 12 }}
            titleStyle={{ fontSize: 18 }}
            onPress={(e) => {
              e.preventDefault();
              handleLoginClick();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreenView;
