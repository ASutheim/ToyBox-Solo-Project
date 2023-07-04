import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ToyList.css";
// import ToyView from "../ToyView/ToyView.jsx";

function ToyList() {
  const dispatch = useDispatch();
  const allToys = useSelector((store) => store.toys);
  const user = useSelector((store) => store.user.id);
  const usersToys = allToys.filter((toy) => toy.owner_id === user);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "GET_TOYS" });
  }, []);

  const handleClick = (id, toyOwnerId, userId) => {
    history.push(`/details/${id}`, { toyOwnerId, userId });
  };
  return (
    <div id="list-container">
      {usersToys.map((toy) => (
        <div key={toy.id} onClick={()=>handleClick(toy.id, toy.owner)}>
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
