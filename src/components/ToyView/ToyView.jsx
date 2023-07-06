import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import ToyEdit from "../ToyEdit/ToyEdit";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ToyView() {
  const dispatch = useDispatch()
  const { id } = useParams();
  const history = useHistory();
  const toy = useSelector((store) => store.toy[0]);
  const user = useSelector((store) => store.user);

  console.log("USER:", user.id);
  console.log("TOY OWNER:", toy?.owner_id);

  const [loading, setLoading] = useState(true);

  //Checks the ids of owner and user, so that certain components render only if the toy is owned by the user
  const [ownerViewOnly, setOwnerViewOnly] = useState(
    toy?.owner_id === user?.id ?? false
  );
  const [borrowerViewOnly, setBorrowerViewOnly] = useState(
    toy?.owner_id != user?.id ?? false
  );

  //Get request for toy of the given ID
  useEffect(() => {
    dispatch({ type: "GET_TOY", payload: id });
  }, {});

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

  const [showBorrowModal, setShowBorrowModal] = useState(false);

  const borrowModal = () => {
    if (toy?.owner_id != user.id) {
      return <div>Borrow Modal</div>;
    }
  };

  return (
    <div>
      {ownerViewOnly && (
        <button onClick={() => setShowEdit(!showEdit)}>
          {showEdit ? "Cancel" : "Edit"}
        </button>
      )}

      {showEdit ? (
        ownerViewOnly && (
          <div id="edit_view">
            <ToyEdit />
          </div>
        )
      ) : (
        <div id="info_view">
          <p id="toy_name">Name: {toy?.name}</p>
          <p id="status"> Status: {toy?.status}</p>
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

          {borrowerViewOnly &&
          <button
            id="borrow_button"
            onClick={() => setShowBorrowModal(!showBorrowModal)}
          >
            Ask to borrow?
          </button>}
          
          {ownerViewOnly && (
            <button id="delete" onClick={handleClickDelete}>
              Delete this toy
            </button>
          )}
          {showDeleteModal && ownerViewOnly && (
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
