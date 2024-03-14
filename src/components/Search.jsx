import React, { useState } from "react";
import DetailsModal from "./DetailsModal";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [emptyResult, setEmptyResult] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBrewery, setSelectedBrewery] = useState(null);

  // fetch data from airtable (for newly added breweries from the submit form)
  const getAirtableData = async () => {
    const airtableAPI =
      "https://api.airtable.com/v0/appQPGY7SNCdqDtdV/Table%201?maxRecords=100&view=Grid%20view";
    const headers = {
      Authorization: `Bearer patxkA4uOl3Cyh9sV.adcda182ede1acc1b0a6684224f61b1b7d78439ac2f7376b6b09a554bdb8f675`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(airtableAPI, { headers });
      const data = await response.json();
      return data.records;
    } catch (error) {
      console.error("Error fetching data from Airtable:", error);
      return [];
    }
  };

  // search for breweries based on search term
  const getBreweries = async () => {
    setLoading(true);
    const query = encodeURIComponent(input);

    const openBreweryResponse = await fetch(
      `https://api.openbrewerydb.org/breweries/search?query=${query}`
    );

    const openBreweryData = await openBreweryResponse.json();

    const airtableData = await getAirtableData();

    const transformedAirtableData = airtableData.map((record) => ({
      id: record.id,
      name: record.fields.Name,
      city: record.fields.City,
      state: record.fields.State,
      brewery_type: record.fields.Type,
      street: record.fields.Address,
      postal_code: record.fields.Postal,
      phone: record.fields.Contact,
      website_url: record.fields.Website,
    }));

    const combinedData = [...openBreweryData, ...transformedAirtableData];

    if (combinedData.length < 1) {
      setEmptyResult(true);
    } else {
      setEmptyResult(false);
    }
    setBreweries(combinedData);
    setLoading(false);
  };

  // clear button
  const handleClearingResults = () => {
    setBreweries([]);
    setEmptyResult(false);
    setInput("");
  };

  // search button
  const handleBreweryClick = (brewery) => {
    setShowUpdateModal(true);
    setSelectedBrewery(brewery);
  };

  // close modal button
  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

  // sort breweries in alphabetical order
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
