import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

function ToyView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const toy = useSelector((store) => store.toy[0]);
  // const allToys = useSelector((store) => store.toys);
  // const user = useSelector((store) => store.user);
  // const history = useHistory();

  console.log("HEY LOOK HERE:", toy);

  useEffect(() => {
    dispatch({ type: "GET_TOY", payload: id });
  }, {});

  return (
    <div>
      <p>Inside toy detail view!</p>
      <p id="toy_name">Name: {toy.name}</p>
      <p id="categories">
        Categories: {toy.toy_categories.map((item) => item).join(", ")}{" "}
      </p>
      <p id="ages">
        Age Group/s: {toy.toy_ages.map((item) => item).join(", ")}{" "}
      </p>
      <p id="description"> Description: {toy.description}</p>
      <div id="image">
        <img src={toy.picture_url} />
      </div>
    </div>
  );
}

export default ToyView;