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
    <div className="list_container">
      <div className="list-header">
        <h2>Your Toys:</h2>
      </div>
      <div className="toy-list">
        {usersToys.map((toy) => (
          <div
            className="toy_thumbnail"
            key={toy.id}
            onClick={() => handleClick(toy.id, toy.owner)}
          >
            <div className="edit">
              <img src="main/documentation/images/edit_icon.png" />
            </div>
            <div className="image">
              <img
                src={toy.picture_url}
                alt={toy.name}
                className="toy-image-list-view"
              />
            </div>
            <p className="toy_name">{toy.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToyList;
