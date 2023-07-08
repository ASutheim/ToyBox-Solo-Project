import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import ToyEdit from "../ToyEdit/ToyEdit";


import "./ToyView.css";

function ToyView() {
  const dispatch = useDispatch();
  const id = useParams();
  const history = useHistory();
  const toy = useSelector((store) => store.toy);
  const user = useSelector((store) => store.user);

  console.log("USER:", user.id);
  console.log("TOY OWNER:", toy?.owner_id);

  const [loading, setLoading] = useState(true);

  //Get request for toy of the given ID
  useEffect(() => {
    dispatch({ type: "GET_TOYS", payload: id });
  }, []);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  const handleClickDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    console.log("Delete button pushed! ID to delete:", id);
    dispatch({ type: "DELETE_TOY", payload: id });
    history.push("/user");
  };

  const DeleteConfirmationModal = ({ onDelete, onCancel }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Confirm Deletion</h3>
          <p>Are you sure you want to delete this toy?</p>
          <div className="modal-buttons">
            <button className="btn-delete" onClick={onDelete}>
              Delete
            </button>
            <button className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleBorrowPopup =() => {
    console.log ()
  }
 
  if (showEdit) {
    return <ToyEdit />;
  }
  return (
    <div className="info-view">
      <div className="toy-details">
        <p id="toy_name">Name: {toy?.name}</p>
        <p id="status"> Status: {toy?.status}</p>
        <p id="categories">
          Categories:{" "}
          {toy?.toy_categories &&
            toy?.toy_categories.map((item) => item).join(", ")}{" "}
        </p>
        <p id="ages">
          Age Group/s:{" "}
          {toy?.toy_ages && toy?.toy_ages.map((item) => item).join(", ")}{" "}
        </p>
        <p id="description"> Description: {toy?.description}</p>
      </div>

      <div className="image-control-container">
        <div id="image">
          <img src={toy?.picture_url} className="toy-image" />
        </div>

        <div className="detail-controls">
          {toy?.owner_id === user?.id && (
            <>
              <button id="delete" onClick={handleClickDelete}>
                Delete this toy
              </button>
              <button onClick={() => setShowEdit(!showEdit)}>
                {showEdit ? "Cancel" : "Edit"}
              </button>
            </>
          )}
          {toy?.owner_id !== user?.id && (<div>
           <button id="openPopup" onClick={handleBorrowPopup}>Ask to borrow?</button>

           <div id="popup" className="popup">
             <div className="popup-content">
              <p>{toy?.name} belongs to {toy.owner}</p>
               <button id="closePopup">Close</button>
             </div>
           </div></div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <DeleteConfirmationModal
          onDelete={() => handleDelete(toy.id)}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default ToyView;
