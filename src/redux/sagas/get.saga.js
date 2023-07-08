import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getToys(action) {
  console.log("Inside getToys saga");
  try {
    const toys = yield axios.get("/api/toys");
    console.log("Get toys saga returns toy data:", toys.data);
    yield put({ type: "RESET_TOY" });
    yield put({ type: "SET_TOYS", payload: toys.data });
    for (let toy of toys.data) {
      console.log("Inside loop of toys! Here's a toy:", toy.id);
      if (toy.id === parseInt(action.payload.id)) {
        console.log("We found a match!!!", toy);
        yield put({ type: "SET_TOY", payload: toy });
      }
    }
  } catch (error) {
    console.log("Error in getToys saga", error);
  }
}
function* getToy(id) {
  console.log("Inside saga for getting toy detail view", id.payload);
  try {
    const toy = yield axios.get(`/api/toys/${id.payload}`);
    console.log("Get toys saga returns toy data:", toy.data);
    yield put({ type: "SET_TOY", payload: toy.data });
  } catch (error) {
    console.log("Error in getToy saga", error);
  }
}
function* displaySaga() {
  yield takeLatest("GET_TOYS", getToys);
  yield takeLatest("GET_TOY", getToy);
}

export default displaySaga;
