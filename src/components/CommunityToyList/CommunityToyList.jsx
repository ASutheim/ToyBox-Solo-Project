import React, { useEffect, useState } from "react";
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

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [toysToDisplay, setToysToDisplay] = useState(allToys)

  const handleSearch = () => {
    console.log("Inside handleSearch function");
    const filteredToys = allToys.filter((toy) => {
      const matchesSearchText = toy.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || toy.category === selectedCategory;
      const matchesAge = selectedAge === "" || toy.age === selectedAge;
      return matchesSearchText && matchesCategory && matchesAge;
    });
    setSearchResults(filteredToys);
    console.log("Search returned these toys:", filteredToys);
    if (filteredToys.length === 0) {
      setShowNoResults(true);
    } else {
      setShowNoResults(false);
    }
  };

  const NoResultsModal = ({ onClose }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>No Results Found</h3>
          <p>
            Sorry, we don't have any toys that match your search! Try again with
            a different search?
          </p>
          <div className="modal-buttons">
            <button className="btn-cancel" onClick={handleClearSearch}>
              Reset Search
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSelectedCategory("");
    setSelectedAge("");
    setSearchResults(allToys);
    setShowNoResults(false);
  };

  const handleClick = (id) => {
    history.push(`/details/${id}`);
  };

  return (
    <div>
      <h1>Community Toy List</h1>

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
              <option value="1">Outdoors</option>
              <option value="2">Sports</option>
              <option value="3">STEM</option>
              <option value="4">Art and Music</option>
              <option value="5">Language/Reading</option>
              <option value="6">Play Pretend</option>
              <option value="7">Dolls/Figurines</option>
              <option value="8">Animals</option>
              <option value="9">Vehicles</option>
              <option value="10">Tools</option>
              <option value="11">Puzzles</option>
              <option value="12">Games</option>
              <option value="13">Electronics</option>
              <option value="14">Building</option>
              <option value="15">Collectibles</option>
              <option value="16">Sensory</option>
            </select>
          </div>
          <div id="search_by_age">
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
            >
              <option value="">Search by age group</option>
              <option value="1">0-2 year olds</option>
              <option value="2">2-4 year olds</option>
              <option value="3">4-6 year olds</option>
              <option value="4">7 and up</option>
              <option value="5">10 and up</option>
              <option value="6">12 and up</option>
              <option value="7">Any age!</option>
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
