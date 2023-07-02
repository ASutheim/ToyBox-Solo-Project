import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ToyEdit() {
  const toy = useSelector((store) => store.toy[0]);

  const [toyInfo, setToyInfo] = useState({
    name: "",
    description: "",
    picture_url: "",
    status: "",
    age: [],
    categories: [],
  });

  const handleEditSubmit = () => {
    console.log("Submit edit button clicked!");
  };

  return (
    <form id="edit_form" onSubmit={handleEditSubmit}>
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        defaultValue={toy.name}
        required
        onChange={(e) => setToyInfo({ ...toyInfo, name: e.target.value })}
      />

      <label for="description">Description:</label>
      <textarea
        type="text"
        id="description"
        name="description"
        rows="4"
        defaultValue={toy.description}
        onChange={(e) =>
          setToyInfo({ ...toyInfo, description: e.target.value })
        }
      />

      <label for="picture_url">URL:</label>
      <input
        type="text"
        id="picture_url"
        name="picture_url"
        defaultValue={toyInfo.picture_url}
        onChange={(e) =>
          setToyInfo({ ...toyInfo, picture_url: e.target.value })
        }
      />

        


    </form>
  );
}

export default ToyEdit;
