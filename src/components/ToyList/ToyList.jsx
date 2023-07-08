import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ToyList.css";
import ToyEdit from "../ToyEdit/ToyEdit";

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

  const handleEdit = () => {
    return <ToyEdit/>
  };

  useEffect(() => {
    dispatch({ type: "GET_TOYS" });
  }, []);

  return (
    <div className="list_container">
      <div className="list-header">
        <h2>My Shared Toys:</h2>
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
