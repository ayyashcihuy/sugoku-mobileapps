import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { fetchSudoku, boardValidation } from "../store/action";

function MainApp({ route, navigation }) {
  const dispatch = useDispatch();
  const { username, difficulty } = route.params;
  const { board, playerBoard, status, loading, error } = useSelector(
    (state) => {
      return {
        board: state.board,
        playerBoard: state.playerBoard,
        status: state.status,
        loading: state.loading,
        error: state.error,
      };
    }
  );

  function changeValue(e, i, index) {
    playerBoard[index][i] = Number(e);
  }

  function validateBoard() {
    dispatch(boardValidation(playerBoard));
  }

  useEffect(() => {
    if (status === "solved") {
      navigation.navigate("Finish", { username, difficulty });
    }
  }, [status]);

  useEffect(() => {
    dispatch(fetchSudoku(difficulty));
  }, []);

  if (loading) {
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
        <Text>Bentar yaaaaa ...</Text>
      </View>
    );
  }

  if (error) {
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
        <Text>Yah Error :( </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          Good Luck {username}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            Difficulty : {difficulty}
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 10,
              marginTop: 10,
              marginHorizontal: 20,
            }}
          >
            Status : {status}
          </Text>
        </View>
        <View
          style={{
            borderColor: "black",
            borderWidth: 3,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            maxHeight: 369,
            maxWidth: 369,
          }}
        >
          {board.length > 0 &&
            board.map((e, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height: 40,
                    width: 363,
                    alignContent: "center",
                    textAlign: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {e.map((x, i) => {
                    if (x == 0) {
                      return (
                        <TextInput
                          keyboardType="numeric"
                          maxLength={1}
                          key={i}
                          style={{
                            borderColor: "gray",
                            borderWidth: 1,
                            width: 41,
                            height: 41,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                          onChangeText={(e) => {
                            changeValue(e, i, index);
                          }}
                        ></TextInput>
                      );
                    } else {
                      return (
                        <Text
                          key={i}
                          style={{
                            borderColor: "gray",
                            backgroundColor: "yellow",
                            borderWidth: 0.5,
                            width: 41,
                            height: 41,
                            textAlign: "center",
                            alignItems: "center",
                          }}
                        >
                          {x}
                        </Text>
                      );
                    }
                  })}
                </View>
              );
            })}
        </View>
        <View
          style={{
            flex: "row",
          }}
        >
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Button
              title="check"
              onPress={validateBoard}
              style={{
                marginTop: 30,
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default MainApp;
