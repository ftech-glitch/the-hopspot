import React from "react";
import ReactDOM from "react-dom";
import styles from "./Details.module.css";

const OverLay = (props) => {
  const handleCloseModal = () => {
    props.setShowUpdateModal(false);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="row">
          <h5 className="modal-text">{props.brewery.name}</h5>
          <p className="modal-text">
            {" "}
            Address: {props.brewery.street}, {props.brewery.postal_code}
          </p>
          <p className="modal-text">Phone: {props.brewery.phone}</p>
          <p className="modal-text">Website: {props.brewery.website_url}</p>
          <button className="col-md-1" onClick={handleCloseModal}>
            close
          </button>
        </div>
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
