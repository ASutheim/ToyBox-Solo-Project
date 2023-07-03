import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CommunityToyList.css";

function CommunityToyList() {
  const dispatch = useDispatch();
  const allToys = useSelector((store) => store.toys);
  const user = useSelector((store) => store.user);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "GET_TOYS" });
  }, []);

  const handleClick = (id) => {
    history.push(`/details/${id}`);
  };

  return (
    <div>
      <h1>Community Toy List</h1>
      <div id="list-container">
        {allToys.map((toy) => (
          <div key={toy.id} onClick={() => handleClick(toy.id)}>
            <div id="image">
              <img src={toy.picture_url} alt={toy.name} />
            </div>
            <p>{toy.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityToyList;
