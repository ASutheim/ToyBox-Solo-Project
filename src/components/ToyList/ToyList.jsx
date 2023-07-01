import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ToyList.css";
import ToyView from "../ToyView/ToyView.jsx";

function ToyList() {
  const dispatch = useDispatch();
  const allToys = useSelector((store) => store.toys);
  const user = useSelector((store) => store.user);
  const usersToys = allToys.filter((toy) => toy.owner_id === user.id);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "GET_TOYS" });
  }, []);

  const handleClick = (id) => {
    history.push(`/details/${id}`);
  };

  return (
    <div id="list-container">
      {usersToys.map((toy) => (
        <div key={toy.id} onClick={handleClick(toy.id)}>
          <div id="image">
            <img src={toy.picture_url} alt={toy.name} />
          </div>
          <p>{toy.name}</p>
        </div>
      ))}
    </div>
  );
}

export default ToyList;
