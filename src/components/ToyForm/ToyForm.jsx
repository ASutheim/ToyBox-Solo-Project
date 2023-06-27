import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ToyForm = () => {
  const dispatch = useDispatch();

  // sets value of 'owner' equal to the id number corresponding to the username??
  // OR need to write GET request for this info
  const owner = useSelector((store) => store.user.id);

  let [newToy, setNewToy] = useState({
    name: "",
    image: "",
    description: "",
    status: "available",
    age: [],
    categories: [],
    date: 
  });

  const handleInput = (event) => {
    setNewToy({}); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_TOY", payload: newToy });
    setNewToy({}); 
  };

  return (
    <div>
  <form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required/>
  
  <label for="description">Description:</label>
  <textarea id="description" name="description" rows="4" required></textarea>
  
  <label for="url">URL:</label>
  <input type="text" id="url" name="url"/>
  
  <fieldset id="ages">
    <legend>Age:</legend>
    <label for="age1"><input type="checkbox" id="age" name="age" value="1"/> 0-2 year olds</label>
    <label for="age2"><input type="checkbox" id="age" name="age" value="2"/> 2-4 year olds</label>
    <label for="age3"><input type="checkbox" id="age" name="age" value="3"/> 4-6 year olds</label>
    <label for="age4"><input type="checkbox" id="age" name="age" value="4"/> 7 and up</label>
    <label for="age5"><input type="checkbox" id="age" name="age" value="5"/> 10 an up</label>
    <label for="age6"><input type="checkbox" id="age" name="age" value="6"/> 12 and up</label>
    <label for="age7"><input type="checkbox" id="age" name="age" value="7"/> Any age!</label>
  </fieldset>
  
  <fieldset id="categories">
    <legend>Category:</legend>
    <label for="category1"><input type="checkbox" id="category" name="category" value="1"/> Category 1</label>
    <label for="category2"><input type="checkbox" id="category" name="category" value="2"/> Category 2</label>
    <label for="category3"><input type="checkbox" id="category" name="category" value="3"/> Category 3</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="4"/> Category 4</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="5"/> Category 4</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="6"/> Category 4</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="7"/> Category 4</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="8"/> Category 4</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="9"/> Category 4</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="10"/> Category 4</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="11"/> Category 4</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="12"/> Category 4</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="13"/> Category 4</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="14"/> Category 4</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="15"/> Category 4</label>
    <label for="category4"><input type="checkbox" id="category" name="category" value="16"/> Category 4</label>
  </fieldset>
  
  <button type="submit">Submit</button>
</form>
</div>
) 

};

export default ToyForm;