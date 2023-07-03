import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ToyEdit() {
  const toy = useSelector((store) => store.toy[0]);

  const [toyInfo, setToyInfo] = useState({
    id: toy.id,
    name: "",
    description: "",
    picture_url: "",
    status: "",
    age: [],
    categories: [],
  });

  const handleStatus = (e) => {
    if ((e.target.checked = true)) {
      setToyInfo({ ...toyInfo, status: "On Loan" });
    } else setToyInfo({ ...toyInfo, status: "Available" });
  };

  const handleAgeOptions = () => {
    let options = document.getElementsByName("age");
    let array = toyInfo.age;
    for (let option of options) {
      if (option.checked) {
        array.push(option.value);
      }
    }
  };

  const handleCategoriesOptions = () => {
    let options = document.getElementsByName("categories");
    let array = toyInfo.categories;
    for (let option of options) {
      if (option.checked) {
        array.push(option.value);
      }
    }
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    handleAgeOptions();
    handleCategoriesOptions();

    console.log("Submitting updated toy:", toyInfo);

    //Dispatches the info to the SAGA reducer
    dispatch({ type: "UPDATE_TOY", payload: toyInfo });
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

      <label for="picture_url">Picture URL:</label>
      <input
        type="text"
        id="picture_url"
        name="picture_url"
        defaultValue={toyInfo.picture_url}
        onChange={(e) =>
          setToyInfo({ ...toyInfo, picture_url: e.target.value })
        }
      />

      <fieldset id="age" value={toy.age}>
        <legend>Age:</legend>
        <label for="age1">
          <input type="checkbox" id="age" name="age" value="1" />
          0-2 year olds
        </label>
        <label for="age2">
          <input type="checkbox" id="age" name="age" value="2" /> 2-4 year olds
        </label>
        <label for="age3">
          <input type="checkbox" id="age" name="age" value="3" /> 4-6 year olds
        </label>
        <label for="age4">
          <input type="checkbox" id="age" name="age" value="4" /> 7 and up
        </label>
        <label for="age5">
          <input type="checkbox" id="age" name="age" value="5" /> 10 an up
        </label>
        <label for="age6">
          <input type="checkbox" id="age" name="age" value="6" /> 12 and up
        </label>
        <label for="age7">
          <input type="checkbox" id="age" name="age" value="7" /> Any age!
        </label>
      </fieldset>

      <fieldset id="categories" value={toy.categories}>
        <legend>Categories:</legend>
        <label for="Outdoors">
          <input type="checkbox" id="category" name="categories" value="1" />
          Outdoors
        </label>
        <label for="Sports">
          <input type="checkbox" id="category" name="categories" value="2" />
          Sports
        </label>
        <label for="STEM">
          <input type="checkbox" id="category" name="categories" value="3" />
          STEM
        </label>
        <label for="Art and Music">
          <input type="checkbox" id="category" name="categories" value="4" />
          Art and Music
        </label>
        <label for="Language/Reading">
          <input type="checkbox" id="category" name="categories" value="5" />
          Language/Reading
        </label>
        <label for="Play Pretend">
          <input type="checkbox" id="category" name="categories" value="6" />
          Play Pretend
        </label>
        <label for="Dolls/Figurines">
          <input type="checkbox" id="category" name="categories" value="7" />
          Dolls/Figurines
        </label>
        <label for="Animals">
          <input type="checkbox" id="category" name="categories" value="8" />
          Animals
        </label>
        <label for="Vehicles">
          <input type="checkbox" id="category" name="categories" value="9" />
          Vehicles
        </label>
        <label for="Tools">
          <input type="checkbox" id="category" name="categories" value="10" />
          Tools
        </label>
        <label for="Puzzles">
          <input type="checkbox" id="category" name="categories" value="11" />
          Puzzles
        </label>
        <label for="Games">
          <input type="checkbox" id="category" name="categories" value="12" />
          Games
        </label>
        <label for="Electronics">
          <input type="checkbox" id="category" name="categories" value="13" />
          Electronics
        </label>
        <label for="Building">
          <input type="checkbox" id="category" name="categories" value="14" />
          Building
        </label>
        <label for="Collectibles">
          <input type="checkbox" id="category" name="categories" value="15" />
          Collectibles
        </label>
        <label for="Sensory">
          <input type="checkbox" id="category" name="categories" value="16" />
          Sensory
        </label>
      </fieldset>
      <label>
        <input
          type="checkbox"
          id="status"
          value={toyInfo.status}
          onChange={handleStatus}
        />{" "}
        Mark this toy as "on loan"
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ToyEdit;
