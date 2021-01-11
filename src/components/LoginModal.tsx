import React from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { LoginDto } from "../models/LoginDto";

interface LoginModalProps {
  onLogin: (data: LoginDto) => void;
  show?: boolean;
}

const LoginModal = (props: LoginModalProps) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.show}
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Login</Text>
            <TextInput
              placeholder="User Name"
              style={{ height: 40, width: 200 }}
              onChangeText={(text) => {
                setUserName(text);
              }}
            />

            <TextInput
              placeholder="Password"
              style={{ height: 40, width: 200 }}
              secureTextEntry={true}
              onChangeText={(password) => {
                setPassword(password);
              }}
            />

            <Button
              onPress={(e) => {
                if (userName === "" || password === "") {
                  alert("Please give credential");
                  return;
                }
                let login = new LoginDto();
                login.name = userName;
                login.password = password;
                props.onLogin(login);
              }}
              title="Login"
              accessibilityLabel="Login button"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    borderRadius: 4,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default LoginModal;
