import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./CommunityToyList.css";

function CommunityToyList() {
  const dispatch = useDispatch();
  const allToys = useSelector((store) => store.toys);
  const [toysToDisplay, setToysToDisplay] = useState([]);
  const history = useHistory();

  //dispatches a request on page load for all the information about all the toys
  useEffect(() => {
    dispatch({ type: "GET_TOYS" });
  }, []);

  //sets the display hook to show all the toys on page load
  useEffect(() => {
    setToysToDisplay(allToys);
  }, [allToys]);

  //sets hooks for search parameters
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [showNoResults, setShowNoResults] = useState(false);
  const [showSearchFields, setShowSearchFields] = useState(true);

  //triggered when the user submits a search query
  const handleSearch = () => {
    let filteredToys = [];

    //stores each toy that passes the filter function in the array of filtered toys
    allToys.map((toy) => {
      if (
        toy.name.toLowerCase().includes(searchText.toLowerCase()) &&
        toy.toy_categories.toString().includes(selectedCategory) &&
        toy.toy_ages.toString().includes(selectedAge)
      ) {
        filteredToys.push(toy);
      }
    });

    //replaces 'allToys' in the display with 'filteredToys' which match the search query
    setToysToDisplay(filteredToys);
    console.log("Search returned these toys:", filteredToys);

    //if no toys match the search query, a modal will inform the user
    if (filteredToys.length === 0) {
      setShowNoResults(true);
      setShowSearchFields(false);
    } else {
      setShowNoResults(false);
      setShowSearchFields(true);
      setSearchText("");
      setSelectedCategory("");
      setSelectedAge("");
    }
  };

  //This modal function is triggered when a search yields no matching toys (empty array)
  const NoResultsModal = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>No Results Found</h3>
          <p>
            You searched for: {searchText} {selectedCategory} {selectedAge}
          </p>
          <p>We don't have any toys that match your search! Try again?</p>
          <div className="modal-buttons">
            <button className="btn-cancel" onClick={handleClearSearch}>
              Reset Search
            </button>
          </div>
        </div>
      </div>
    );
  };

  //This clears all the search parameters and resets the display to allToys
  const handleClearSearch = () => {
    setSearchText("");
    setSelectedCategory("");
    setSelectedAge("");
    setShowNoResults(false);
    setShowSearchFields(true);
    setToysToDisplay(allToys);
  };

  //This routes the user to the detailed ToyView on click
  const handleClick = (id) => {
    history.push(`/details/${id}`);
  };

  return (
    <div>
      <div id="search_fields">
        <form id="search_list_form">
          <div id="search_by_name">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search toys by name..."
            />
          </div>
          <div id="search_by_category">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Search by category</option>
              <option value="Outdoors">Outdoors</option>
              <option value="Sports">Sports</option>
              <option value="STEM<">STEM</option>
              <option value="Art and Music">Art and Music</option>
              <option value="Language/Reading">Language/Reading</option>
              <option value="Play Pretend">Play Pretend</option>
              <option value="Dolls/Figurines">Dolls/Figurines</option>
              <option value="Animals">Animals</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Tools">Tools</option>
              <option value="Puzzles">Puzzles</option>
              <option value="Games">Games</option>
              <option value="Electronics">Electronics</option>
              <option value="Building<">Building</option>
              <option value="Collectibles">Collectibles</option>
              <option value="Sensory">Sensory</option>
            </select>
          </div>
          <div id="search_by_age">
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
            >
              <option value="">Search by age group</option>
              <option value="0-2 year olds">0-2 year olds</option>
              <option value="2-4 year olds">2-4 year olds</option>
              <option value="4-6 year olds">4-6 year olds</option>
              <option value="7 and up">7 and up</option>
              <option value="10 and up">10 and up</option>
              <option value="12 and up">12 and up</option>
              <option value="Any age!">Any age!</option>
            </select>
          </div>
          <button id="search_button" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>

      <div id="no_results_div">
        {showNoResults && <NoResultsModal onClearSearch={handleClearSearch} />}
      </div>

      <div className="community-toy-list-container">
        {toysToDisplay.map((toy) => (
          <div key={toy.id} onClick={() => handleClick(toy.id)}>
            <div className="toy-image-list-view ">
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
