import React, { useState } from "react";
import DetailsModal from "./DetailsModal";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [emptyResult, setEmptyResult] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBrewery, setSelectedBrewery] = useState(null);

  const getBreweries = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openbrewerydb.org/breweries/search?query=${input}`
      );
      const data = await response.json();

      setTimeout(() => {
        if (data.length < 1) {
          setEmptyResult(true);
        }
        setBreweries(data);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error(error.message);
      alert("Error fetching brewery data");
    }
  };

  const handleClearingResults = () => {
    setBreweries([]);
    setEmptyResult(false);
    setInput("");
  };

  const handleBreweryClick = (brewery) => {
    setShowUpdateModal(true);
    setSelectedBrewery(brewery);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

  const sortBreweries = breweries
    .sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .map((brewery) => (
      <>
        <li
          className="list-item"
          key={brewery.id}
          onClick={() => handleBreweryClick(brewery)}
        >
          <div className="list-item-title">
            <h3>{brewery.name}</h3>
          </div>
          <div className="list-item-title">
            <p className="lead">{brewery.city + ", " + brewery.state}</p>
          </div>
        </li>
      </>
    ));

  return (
    <>
      {showUpdateModal && (
        <DetailsModal
          brewery={selectedBrewery}
          setShowUpdateModal={setShowUpdateModal}
          getBreweries={getBreweries}
          handleCloseModal={handleCloseModal}
        ></DetailsModal>
      )}
      <main>
        <div className="search-bar-container">
          <div className="input-group">
            <input
              type="text"
              value={input}
              placeholder="Search breweries"
              aria-label="Search"
              className="form-control"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="btn btn-dark mx-1"
              type="button"
              id="button-addon1"
              data-ripple-color="dark"
              onClick={getBreweries}
            >
              SEARCH
            </button>
            <button
              className="btn btn-dark mx-1"
              type="button"
              id="button-addon2"
              data-ripple-color="dark"
              onClick={handleClearingResults}
            >
              CLEAR
            </button>
          </div>
        </div>
        <div className="results-container">
          {loading && (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          <ul className="list">{breweries && sortBreweries}</ul>
          {emptyResult === true && (
            <p className="lead text-center">NO RESULTS</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Search;
