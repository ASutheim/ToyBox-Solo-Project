import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* postToy(action) {
  console.log("Inside POST saga", action.payload);
  try {
    yield axios.post("/api/toys", action.payload);
    yield put({ type: "GET_USER_TOYS" });
  } catch {
    console.log("error with post request in post saga");
  }
}

function* postRoot() {
  yield takeLatest("POST_TOY", postToy);
}

export default postRoot;
