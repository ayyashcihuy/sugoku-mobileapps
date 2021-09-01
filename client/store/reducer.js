import actionType from "./actionType";

const initialSugoku = {
  board: [],
  playerBoard: [],
  status: "unsolved",
  loading: false,
  error: null,
};

function reducer(state = initialSugoku, action) {
  switch (action.type) {
    case actionType.SENT_DATA:
      return {
        ...state,
        board: action.payload,
        playerBoard: JSON.parse(JSON.stringify(action.payload)),
      };
    case actionType.CHANGE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case actionType.LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case actionType.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
