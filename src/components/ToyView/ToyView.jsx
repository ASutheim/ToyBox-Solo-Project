import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

function ToyView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const allToys = useSelector((store) => store.toys);
  // const user = useSelector((store) => store.user);
  // const history = useHistory();

  useEffect(() => {
    dispatch({ type: "GET_TOY", payload: id });
  }, []);

  return (
    <div>
      <p>Inside toy detail view!</p>
    </div>
  );
}

export default ToyView;
