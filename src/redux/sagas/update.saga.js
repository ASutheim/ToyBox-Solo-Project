import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* updateToy(action) {
  console.log("Inside UPDATE saga", action.payload);
  try {
    yield axios.put(`/api/toys/${action.payload.id}`, action.payload);
    yield put({ type: "GET_TOY", payload: action.payload.id });
  } catch (error) {
    console.log("error with update request in post saga", error);
  }
}

function* postRoot() {
  yield takeLatest("UPDATE_TOY", updateToy);
}

export default postRoot;
