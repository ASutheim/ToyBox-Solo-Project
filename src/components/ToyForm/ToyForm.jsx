import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ToyForm.css";
const ToyForm = () => {
  const dispatch = useDispatch();

  const owner = useSelector((store) => store.user.id);

  const emptyToyFormState = {
    owner_id: owner,
    name: "",
    description: "",
    picture_url: "",
    status: "available",
    age: [],
    categories: [],
  };

  const [newToy, setNewToy] = useState(emptyToyFormState);

  function handleAgeOptions() {
    let options = document.getElementsByName("age");
    let array = newToy.age;
    for (let option of options) {
      if (option.checked) {
        array.push(option.value);
      }
    }
  }

  function handleCategoriesOptions() {
    let options = document.getElementsByName("categories");
    let array = newToy.categories;
    for (let option of options) {
      if (option.checked) {
        array.push(option.value);
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    handleAgeOptions();
    handleCategoriesOptions();

    console.log("Submitting a new toy:", newToy);

    //Dispatches the info to the SAGA reducer
    dispatch({ type: "POST_TOY", payload: newToy });

    //Resets the locally stored value of newToy variable
    setNewToy(emptyToyFormState);

    //Resets the input fields in the form
    document.getElementById("input_form").reset();
  };

  return (
    <div>
      <form id="input_form" onSubmit={handleSubmit} className="toy-form">
        <div className="form-head">
          <p>Add a new toy!</p>
        </div>
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          className="toy-form-input"
          name="name"
          placeholder="A name for your toy"
          value={newToy.name}
          required
          onChange={(e) => setNewToy({ ...newToy, name: e.target.value })}
        />

        <label for="description">Description:</label>
        <textarea
          type="text"
          id="description"
          className="toy-form-input"
          name="description"
          placeholder="Tell people about this toy! How do you use it? What makes it great? Any condition notes, like missing pieces?"
          rows="4"
          value={newToy.description}
          onChange={(e) =>
            setNewToy({ ...newToy, description: e.target.value })
          }
        />

        <label for="picture_url">URL:</label>
        <input
          type="text"
          id="picture_url"
          className="toy-form-input"
          name="picture_url"
          placeholder="A link to a photo of your toy"
          value={newToy.picture_url}
          onChange={(e) =>
            setNewToy({ ...newToy, picture_url: e.target.value })
          }
        />

        <fieldset id="age" value={newToy.age} className="toy-form-fieldset age">
          <legend>Age:</legend>
          <section className="fieldset-row">
            <label for="age1">
              <input type="checkbox" id="age" name="age" value="1" />
              0-2 year olds
            </label>
            <label for="age2">
              <input type="checkbox" id="age" name="age" value="2" /> 2-4 year
              olds
            </label>
            <label for="age3">
              <input type="checkbox" id="age" name="age" value="3" /> 4-6 year
              olds
            </label>

            <label for="age4">
              <input type="checkbox" id="age" name="age" value="4" /> 7 and up
            </label>
          </section>
          <section className="fieldset-row">
            <label for="age5">
              <input type="checkbox" id="age" name="age" value="5" /> 10 and up
            </label>
            <label for="age6">
              <input type="checkbox" id="age" name="age" value="6" /> 12 and up
            </label>
            <label for="age7">
              <input type="checkbox" id="age" name="age" value="7" /> Any age!
            </label>
          </section>
        </fieldset>

        <fieldset id="categories" className="toy-form-fieldset category">
          <legend>Categories:</legend>
          <section className="fieldset-row">
            <label for="Outdoors">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="1"
              />
              Outdoors
            </label>
            <label for="Sports">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="2"
              />
              Sports
            </label>
            <label for="STEM">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="3"
              />
              STEM
            </label>
            <label for="Art and Music">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="4"
              />
              Art and Music
            </label>
            <label for="Language/Reading">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="5"
              />
              Language/Reading
            </label>
            <label for="Play Pretend">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="6"
              />
              Play Pretend
            </label>
            <label for="Dolls/Figurines">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="7"
              />
              Dolls/Figurines
            </label>
            <label for="Animals">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="8"
              />
              Animals
            </label>
          </section>
          <section className="fieldset-row">
            <label for="Vehicles">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="9"
              />
              Vehicles
            </label>
            <label for="Tools">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="10"
              />
              Tools
            </label>
            <label for="Puzzles">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="11"
              />
              Puzzles
            </label>
            <label for="Games">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="12"
              />
              Games
            </label>
            <label for="Electronics">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="13"
              />
              Electronics
            </label>
            <label for="Building">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="14"
              />
              Building
            </label>
            <label for="Collectibles">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="15"
              />
              Collectibles
            </label>
            <label for="Sensory">
              <input
                type="checkbox"
                id="category"
                name="categories"
                value="16"
              />
              Sensory
            </label>
          </section>
        </fieldset>

        <button type="submit" className="base-button submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ToyForm;
