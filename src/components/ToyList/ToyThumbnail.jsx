import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function ToyList() {
    const dispatch = useDispatch();
    const toysArray = useSelector((store) => store.toys);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "GET_TOYS" });
      }, []);

      const handleClick = (id) => {
        history.push(`/details/${id}`);
      };
 
      return (
        <div id="list-container">
          {toysArray.map((toy) => (
            <div key={toy.id} onClick={handleClick}> 
              <div id="image">
                <img src={toy.picture_url} alt={toy.name} />
              </div>
              <p>{toy.name}</p>
            </div>
          ))}
        </div>
      );
      

}

export default ToyList