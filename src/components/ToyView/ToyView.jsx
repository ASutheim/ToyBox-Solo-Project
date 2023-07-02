import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import ToyEdit from "../ToyEdit/ToyEdit";

function ToyView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const toy = useSelector((store) => store.toy[0]);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "GET_TOY", payload: id });
  }, {});

  const [showModal, setShowModal] = useState(false);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleClickDelete = () => {
    setShowModal(true);
  };

  const handleDelete = () => {
    setShowModal(false);
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

  const [showEdit, setShowEdit] = useState(false);

  return (
    <div>
      <p>Inside toy detail view!</p>

      <button onClick={() => setShowEdit(!showEdit)}>
        {showEdit ? "Cancel" : "Edit"}
      </button>

      {showEdit ? (
        <div id="edit_view">
          <ToyEdit />
        </div>
      ) : (
        <div id="info_view">
          <p id="toy_name">Name: {toy?.name}</p>

          <p id="categories">
            Categories: {toy?.toy_categories.map((item) => item).join(", ")}{" "}
          </p>
          <p id="ages">
            Age Group/s: {toy?.toy_ages.map((item) => item).join(", ")}{" "}
          </p>
          <p id="description"> Description: {toy?.description}</p>
          <div id="image">
            <img src={toy?.picture_url} />
          </div>
          <button id="delete" onClick={handleClickDelete}>
            Delete this toy
          </button>
          {showModal && (
            <DeleteConfirmationModal
              onDelete={() => handleDelete(toy.id)}
              onCancel={handleCancel}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ToyView;
