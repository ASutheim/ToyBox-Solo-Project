import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import ToyEdit from "../ToyEdit/ToyEdit";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";

import "./ToyView.css";

function ToyView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const toy = useSelector((store) => store.toy);
  const user = useSelector((store) => store.user);

  //Get request for toy of the given ID
  useEffect(() => {
    dispatch({ type: "GET_TOY", payload: id });
  }, []);

  console.log("Here's the toy's ID!!!", id);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  const handleClickDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = (id) => {
    setShowDeleteModal(false);
    console.log("Delete button pushed! ID to delete:", id);
    dispatch({ type: "DELETE_TOY", payload: id });
    history.push("/user");
  };

  if (showEdit) {
    return <ToyEdit setShowEdit={setShowEdit} />;
  }
  return (
    <div className="info-view">
      <div className="image-control-container">
        <div id="image">
          <img src={toy?.picture_url} className="toy-image" />
        </div>
      </div>

      <div id="right-side-wrapper">
        <div className="toy-details">
          <p className="detail-label" id="toy_name">
            {" "}
            <b>Name:</b> {toy?.name}
          </p>

          <p className="detail-label">
            <b>Status: </b>
            <span
              style={{
                color: toy?.status === "Available" ? "#006400" : "#FF8C00",
              }}
            >
              {toy?.status}
            </span>
          </p>

          <p className="detail-label" id="categories">
            <b>Categories:</b>{" "}
            {toy?.toy_categories &&
              toy?.toy_categories.map((item) => item).join(", ")}{" "}
          </p>
          <p className="detail-label" id="ages">
            <b>Age Group/s:</b>{" "}
            {toy?.toy_ages && toy?.toy_ages.map((item) => item).join(", ")}{" "}
          </p>
          <p className="detail-label" id="description">
            {" "}
            <b>Description:</b> {toy?.description}
          </p>
        </div>

        <div className="detail-controls">
          {toy?.owner_id === user?.id && (
            <>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={handleClickDelete}
                className="base-button"
              >
                Delete this toy
              </Button>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setShowEdit(!showEdit)}
                className="base-button"
              >
                Edit This Toy
              </Button>
            </>
          )}
          {toy?.owner_id !== user?.id && (
            <div>
              <Popup
                trigger={
                  <button id="openPopup" onClick={open} className="base-button">
                    Ask to borrow?
                  </button>
                }
                modal
                nested
              >
                {(close) => (
                  <div className="popup-content">
                    <p>
                      <b>{toy?.name}</b>
                    </p>
                    <p>
                      is currently <b>{toy.status}!</b>
                    </p>
                    <p>Here's the email address to get in touch:</p>
                    <p>
                      <b>{toy.email}</b>
                    </p>
                    <button
                      id="closePopup"
                      onClick={close}
                      className="base-button"
                    >
                      Got it!
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          )}
        </div>
      </div>
      {showDeleteModal && (
        <Popup
          open={showDeleteModal}
          onClose={handleCancel}
          modal
          closeOnDocumentClick={false}
        >
          <div className="delete-popup">
            <div className="delete-popup-content">
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this toy?</p>
              <div className="detail-controls">
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  className="base-button"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </Button>

                <Button
                  variant="contained"
                  startIcon={<BlockIcon />}
                  className="base-button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
}

export default ToyView;
