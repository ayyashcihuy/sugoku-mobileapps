import { Text, TextInput, View, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";

function Finish({ route, navigation }) {
  const { username, difficulty } = route.params;
  function backToHome() {
    navigation.navigate("Home");
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
      }}
    >
      <Text>Congrats {username} !!!!</Text>
      <Text>You Finish The Game With Difficulty {difficulty} !!!!</Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Button title="Back To Home" onPress={backToHome} />
      </View>
    </View>
  );
}

export default Finish;
