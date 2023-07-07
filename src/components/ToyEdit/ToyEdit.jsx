import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "./ToyEdit.css";

function ToyEdit() {
  const history = useHistory();
  const dispatch = useDispatch();
  const toy = useSelector((store) => store.toy[0]);
  const { id } = useParams();
  console.log("TOYINFOOOOOOOOO:", toy);

  const [toyInfo, setToyInfo] = useState({
    id: id,
    name: toy.name,
    description: toy.description,
    picture_url: toy.picture_url,
    status: toy.status,
    toy_ages: toy.toy_ages,
    toy_categories: toy.toy_categories,
  });

  const categoryOptions = [
    { name: "Outdoors", value: 1, checked: "" },
    { name: "Sports", value: 2, checked: "" },
    { name: "STEM", value: 3, checked: "" },
    { name: "Art and Music", value: 4, checked: "" },
    { name: "Language/Reading", value: 5, checked: "" },
    { name: "Play Pretend", value: 6, checked: "" },
    { name: "Dolls/Figurines", value: 7, checked: "" },
    { name: "Animals", value: 8, checked: "" },
    { name: "Vehicles", value: 9, checked: "" },
    { name: "Tools", value: 10, checked: "" },
    { name: "Puzzles", value: 11, checked: "" },
    { name: "Games", value: 12, checked: "" },
    { name: "Electronics", value: 13, checked: "" },
    { name: "Building", value: 14, checked: "" },
    { name: "Collectibles", value: 15, checked: "" },
    { name: "Sensory", value: 16, checked: "" },
  ];

  const handleCategoryDefaults = () => {
    return categoryOptions.map((category) => {
      if (toy.toy_categories.includes(category.name)) {
        category.checked = true; // Update the checked value for matching categories
      } else {
        category.checked = false;
      }
      return (
        <label htmlFor={category.name} key={category.value}>
          <input
            type="checkbox"
            className="category"
            value={category.value}
            checked={category.checked}
            onChange={handleCategoryChange(category)}
          />
          {category.name}
        </label>
      );
    });
  };
  const handleCategoryChange = (category) => {
    return (event) => {
      const isChecked = event.target.checked;
      category.checked = isChecked;
    };
  };

  const ageOptions = [
    { name: "0-2 year olds", value: 1 },
    { name: "2-4 year olds", value: 2 },
    { name: "4-6 year olds", value: 3 },
    { name: "7 and up", value: 4 },
    { name: "10 and up", value: 5 },
    { name: "12 and up", value: 6 },
    { name: "Any age!", value: 7 },
  ];
  const handleAgeDefaults = () => {
    return ageOptions.map((age) => {
      if (toy.toy_ages.includes(age.name)) {
        return (
          <label htmlFor={age.name} key={age.value}>
            <input
              type="checkbox"
              className="category"
              value={age.value}
              checked
            />
            {age.name}
          </label>
        );
      } else {
        return (
          <label htmlFor={age.name} key={age.value}>
            <input type="checkbox" className="category" value={age.value} />
            {age.name}
          </label>
        );
      }
    });
  };

  const handleStatus = (e) => {
    if ((e.target.checked = true)) {
      setToyInfo({ ...toyInfo, status: "On Loan" });
    } else setToyInfo({ ...toyInfo, status: "Available" });
  };

  const handleAgeOptions = () => {
    let options = document.getElementsByName("age");
    let array = toyInfo.toy_ages;
    for (let option of options) {
      if (option.checked) {
        array.push(option.value);
      }
    }
    setToyInfo({ ...toyInfo, toy_ages: array });
  };

  const handleCategoriesOptions = () => {
    let options = document.getElementsByName("categories");
    let array = toyInfo.toy_categories;
    for (let option of options) {
      if (option.checked) {
        array.push(option.value);
      }
    }
    setToyInfo({ ...toyInfo, toy_categories: array });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    handleAgeOptions();
    handleCategoriesOptions();

    console.log("Submitting updated toy:", toyInfo);

    //Dispatches the info to the SAGA reducer
    dispatch({ type: "UPDATE_TOY", payload: toyInfo });
    showConfirmation();
  };

  const showConfirmation = () => {
    return (
      <div className="popup" id="confirmationPopup">
        <p>
          You've updated <b>{toyInfo.name}</b>
        </p>
        <button onClick={closePopup()}>Close</button>
      </div>
    );
  };

  const closePopup = () => {
    history.push("/user");
  };

  return (
    <form id="edit_form" onSubmit={handleEditSubmit}>
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        defaultValue={toyInfo.name}
        required
        onChange={(e) => setToyInfo({ ...toyInfo, name: e.target.value })}
      />

      <label for="description">Description:</label>
      <textarea
        type="text"
        id="description"
        name="description"
        rows="4"
        defaultValue={toyInfo.description}
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

      <fieldset id="age" value={toyInfo.toy_ages}>
        {handleAgeDefaults()}
      </fieldset>

      <fieldset id="categories" value={toyInfo.toy_categories}>
        <legend>Categories:</legend>
        {handleCategoryDefaults()}
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
