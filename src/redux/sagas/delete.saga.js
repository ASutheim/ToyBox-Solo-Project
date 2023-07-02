import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* deleteToy(id) {
  console.log("Inside delete toy saga for toy of ID:", id.payload);
  try {
    yield axios.delete(`/api/toys/${id.payload}`);
  } catch (error) {
    console.log("Error in deleteToy saga", error);
  }
}

function* deleteSaga() {
  yield takeLatest("DELETE_TOY", deleteToy);
}

export default deleteSaga;
