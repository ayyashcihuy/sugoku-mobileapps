import {
  Text,
  TextInput,
  View,
  Button,
  Alert,
  StyleSheet,
  Picker,
} from "react-native";
import React, { useEffect, useState } from "react";

function Home({ navigation }) {
  const [username, setUsername] = useState("");
  const [difficulty, setDifficulty] = useState("choose");

  function goPlay() {
    if (username && difficulty !== "choose") {
      navigation.navigate("MainApp", { username, difficulty });
    } else {
      alert("Insert Your Username and Difficulty");
    }
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: 10,
        }}
      >
        Sugoku 2
      </Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Insert Your Name Here</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
        ></TextInput>
        <Picker
          selectedValue={difficulty}
          style={{
            backgroundColor: "#eeee",
            borderWidth: 0,
            borderRadius: 999,
            paddingLeft: 80,
          }}
          value={difficulty}
          itemStyle={{ textAlign: "center" }}
          onValueChange={(e) => setDifficulty(e)}
        >
          <Picker.Item label="Choose" value="choose" />
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker>
        <Button
          title="Lets Go"
          onPress={() => goPlay()}
          style={{
            marginTop: 40,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 220,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Home;
