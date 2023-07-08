import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ToyList.css";

import ToyItem from "./ToyItem";

function ToyList() {
  const dispatch = useDispatch();
  const allToys = useSelector((store) => store.toys);
  const user = useSelector((store) => store.user.id);
  const usersToys = allToys.filter((toy) => toy.owner_id === user);
  const history = useHistory();

  const handleClick = (id, toyOwnerId, userId) => {
    history.push(`/details/${id}`, { toyOwnerId, userId });
  };

  //TODO -> Write a handleEdit function for what you want to happen when you click the edit button.
  const handleEdit = () => {
    //Stuff here, please!
  };

  useEffect(() => {
    dispatch({ type: "GET_TOYS" });
  }, []);

  return (
    <div className="list_container">
      <div className="list-header">
        <h2>Your Toys:</h2>
      </div>
      <div className="toy-list">
        {usersToys.map((toy) => (
          <ToyItem
            toy={toy}
            handleNavigateDetailView={handleClick}
            canEdit={true}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default ToyList;
