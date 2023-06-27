import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getToys() {
console.log("Inside getToys saga")
    try {
      const toys = yield axios.get("/api/toys");
      console.log("Get toys saga returns toy data:", toys.data);
      yield put({ type: "SET_TOYS", payload: toys.data });
    } catch {
      console.log("Error in getToys saga", error);
    }
  }

  function* displaySaga() {
    yield takeLatest('GET_TOYS', getToys);
  }
  
  export default displaySaga;