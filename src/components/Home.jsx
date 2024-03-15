import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Details.module.css";
import BreweriesList from "./BreweriesList";

const Home = () => {
  const [randomBrewery, setRandomBrewery] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allBreweries, setAllBreweries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // fetch full brewery list
  useEffect(() => {
    const fetchBreweries = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.openbrewerydb.org/breweries?page=${page}&per_page=50`
      );
      const data = await response.json();
      if (data.length > 0) {
        setAllBreweries((prevBreweries) => [...prevBreweries, ...data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    };

    fetchBreweries();
  }, [page]);

  // generate a random brewery from full brewery list
  const getRandomBrewery = () => {
    if (allBreweries.length > 0) {
      const randomIndex = Math.floor(Math.random() * allBreweries.length);
      setRandomBrewery(allBreweries[randomIndex]);
      setShowModal(true);
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
