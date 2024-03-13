import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Details.module.css";

const Home = () => {
  const [randomBrewery, setRandomBrewery] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getRandomBrewery = async () => {
    try {
      const response = await fetch(
        "https://api.openbrewerydb.org/v1/breweries/random"
      );
      const data = await response.json();
      setRandomBrewery(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching random brewery:", error.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <br />
      <br />
      <h1 className="header">Discover Your Next HopSpot</h1>
      <h5 className="subheader">Connecting beer enthusiasts with breweries</h5>
      <br />
      <br />
      <div className="d-flex justify-content-center">
        <div className="col-md-3">
          <button
            className="btn btn-dark"
            type="button"
            id="button-addon1"
            data-ripple-color="dark"
            onClick={getRandomBrewery}
          >
            Generate a random brewery
          </button>
        </div>
        <div className="col-md-3">
          <Link to="/search" className="btn btn-dark" role="button">
            Search for breweries
          </Link>
        </div>
      </div>
      <br />
      <br />
      {randomBrewery && showModal && (
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <div className="row">
              <h5 className="modal-text">{randomBrewery.name}</h5>
              <p className="modal-text">
                Address: {randomBrewery.street}, {randomBrewery.city},{" "}
                {randomBrewery.state} {randomBrewery.postal_code}
              </p>
              <p className="modal-text">Phone: {randomBrewery.phone}</p>
              <p className="modal-text">Website: {randomBrewery.website_url}</p>
              <button className="col-md-1" onClick={handleCloseModal}>
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
