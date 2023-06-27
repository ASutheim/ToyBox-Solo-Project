import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ToyForm = () => {
  const dispatch = useDispatch();

  // sets value of 'owner' equal to the id number corresponding to the username??
  // OR need to write GET request for this info??
  const owner = useSelector((store) => store.user.id);
  console.log("The owner id for this page is:", owner);

  let [newToy, setNewToy] = useState({
    name: "",
    image: "",
    description: "",
    status: "available",
    age: [],
    categories: [],
  });

  const handleInput = () => {
    setNewToy({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting a new toy:", newToy);

    //Dispatches the info to the SAGA reducer
    dispatch({ type: "POST_TOY", payload: newToy });

    //Resets the locally stored value of newToy variable
    setNewToy({});

    //Resets the input fields in the form
    document.getElementById("input_form").reset();
  };

  return (
    <div>
      <form id="input_form" onSubmit={handleSubmit} onChange={handleInput}>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label for="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          required
        ></textarea>

        <label for="url">URL:</label>
        <input type="text" id="url" name="url" />

        <fieldset id="ages">
          <legend>Age:</legend>
          <label for="age1">
            <input type="checkbox" id="age" name="age" value="1" /> 0-2 year
            olds
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

        <fieldset id="categories">
          <legend>Category:</legend>
          <label for="Outdoors">
            <input type="checkbox" id="category" name="Outdoors" value="1" />
            Outdoors
          </label>
          <label for="Sports">
            <input type="checkbox" id="category" name="Sports" value="2" />
            Sports
          </label>
          <label for="STEM">
            <input type="checkbox" id="category" name="STEM" value="3" />{" "}
            STEM
          </label>
          <label for="Art and Music">
            <input type="checkbox" id="category" name="Art and Music" value="4" />{" "}
            Art and Music
          </label>
          <label for="Language/Reading">
            <input type="checkbox" id="category" name="Language/Reading" value="5" />{" "}
            Language/Reading
          </label>
          <label for="Play Pretend">
            <input type="checkbox" id="category" name="Play Pretend" value="6" />{" "}
            Play Pretend
          </label>
          <label for="Dolls/Figurines">
            <input type="checkbox" id="category" name="Dolls/Figurines" value="7" />{" "}
            Dolls/Figurines
          </label>
          <label for="Animals">
            <input type="checkbox" id="category" name="Animals" value="8" />{" "}
            Animals
          </label>
          <label for="Vehicles">
            <input type="checkbox" id="category" name="Vehicles" value="9" />{" "}
            Vehicles
          </label>
          <label for="Tools">
            <input type="checkbox" id="category" name="Tools" value="10" />{" "}
            Tools
          </label>
          <label for="Puzzles">
            <input type="checkbox" id="category" name="Puzzles" value="11" />{" "}
            Puzzles
          </label>
          <label for="Games">
            <input type="checkbox" id="category" name="Games" value="12" />{" "}
            Games
          </label>
          <label for="Electronics">
            <input type="checkbox" id="category" name="Electronics" value="13" />{" "}
            Electronics
          </label>
          <label for="Building">
            <input type="checkbox" id="category" name="Building" value="14" />{" "}
            Building
          </label>
          <label for="Collectibles">
            <input type="checkbox" id="category" name="Collectibles" value="15" />{" "}
            Collectibles
          </label>
          <label for="Sensory">
            <input type="checkbox" id="category" name="Sensory" value="16" />{" "}
            Sensory
          </label>
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ToyForm;
