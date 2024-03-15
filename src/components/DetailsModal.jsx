import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Details.module.css";
import UpdateForm from "./UpdateForm";

const OverLay = (props) => {
  const [editedBrewery, setEditedBrewery] = useState({
    fields: { ...props.brewery },
  });
  const [editMode, setEditMode] = useState(false);

  // close modal
  const handleCloseModal = () => {
    props.setShowUpdateModal(false);
  };

  // handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBrewery((prevBrewery) => ({
      ...prevBrewery,
      fields: {
        ...prevBrewery.fields,
        [name]: value,
      },
    }));
  };

  // handle save edits
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/appQPGY7SNCdqDtdV/Table%201`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer patxkA4uOl3Cyh9sV.adcda182ede1acc1b0a6684224f61b1b7d78439ac2f7376b6b09a554bdb8f675`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                id: props.brewery.id,
                fields: {
                  Name: editedBrewery.fields.name,
                  Type: editedBrewery.fields.brewery_type,
                  City: editedBrewery.fields.city,
                  State: editedBrewery.fields.state,
                  Address: editedBrewery.fields.street,
                  Postal: editedBrewery.fields.postal_code,
                  Contact: editedBrewery.fields.phone,
                  Website: editedBrewery.fields.website_url,
                },
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update brewery record");
      }

      // update local state or trigger a refresh of brewery data
      props.getBreweries();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating brewery:", error);
    }
  };

  // handle cancel edits
  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        {editMode ? (
          <UpdateForm
            editedBrewery={editedBrewery}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveChanges}
            handleCancel={handleCancel}
          />
        ) : (
          <div className="row">
            <h5 className="modal-text">{props.brewery.name}</h5>
            <p className="modal-text">Type: {props.brewery.brewery_type}</p>
            <p className="modal-text">
              {" "}
              Address: {props.brewery.street}, {props.brewery.postal_code}
            </p>
            <p className="modal-text">Phone: {props.brewery.phone}</p>
            <p className="modal-text">Website: {props.brewery.website_url}</p>
            <button className="col-md-1" onClick={() => setEditMode(true)}>
              edit
            </button>
            <button className="col-md-1" onClick={handleCloseModal}>
              close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailsModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          brewery={props.brewery}
          setShowUpdateModal={props.setShowUpdateModal}
          getBreweries={props.getBreweries}
        ></OverLay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default DetailsModal;
