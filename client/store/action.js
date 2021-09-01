import actionType from "./actionType";
import axios from "axios";

export const sentBoard = (data) => {
  return {
    type: actionType.SENT_DATA,
    payload: data,
  };
};

export const changeStatus = (data) => {
  return {
    type: actionType.CHANGE_STATUS,
    payload: data,
  };
};

export const fetchSudoku = (data) => {
  return (dispatch) => {
    dispatch({ type: actionType.LOADING });
    axios
      .get(`https://sugoku.herokuapp.com/board?difficulty=${data}`)
      .then(({ data }) => {
        console.log(data);
        dispatch(sentBoard(data.board));
      })
      .catch((err) => {
        dispatch({ type: actionType.ERROR, payload: err });
      })
      .finally(() => {
        dispatch({ type: actionType.LOADING });
      });
  };
};

export const boardValidation = (data) => {
  const board = { board: data };
  const encodeBoard = (board) =>
    board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );
  const encodeParams = (params) =>
    Object.keys(params)
      .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&");
  return (dispatch) => {
    axios({
      method: "POST",
      url: "https://sugoku.herokuapp.com/validate",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: encodeParams(board),
    })
      .then((result) => {
        // console.log(result.data);
        dispatch(changeStatus(result.data.status));
        return axios({
          method: "POST",
          url: "https://sugoku.herokuapp.com/solve",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          data: encodeParams(board),
        });
      })
      .then((result) => {
        console.log(result, "ini hasil");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
