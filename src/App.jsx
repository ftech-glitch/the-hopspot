import React, { useState } from "react";
import Header from "./components/Header";
import Details from "./components/Details";

function App() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [emptyResult, setEmptyResult] = useState(false);

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

  // Sort breweries in alphabetical order
  const breweriesArr = breweries
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
          data-toggle="modal"
          data-target={"#detailsModal_" + brewery.id}
        >
          <div className="list-item-title">
            <div text=":beer:" />
            <h3>{brewery.name}</h3>
          </div>
          <div className="list-item-title">
            <div text=":round_pushpin:" />
            <p className="lead">{brewery.city + ", " + brewery.state}</p>
          </div>
        </li>
        <Details brewery={brewery} />
      </>
    ));

  return (
    <>
      <Header />
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
          <ul className="list">{breweries && breweriesArr}</ul>
          {emptyResult === true && (
            <p className="lead text-center">NO RESULTS</p>
          )}
        </div>
      </main>
    </>
  );
}

// patxkA4uOl3Cyh9sV.adcda182ede1acc1b0a6684224f61b1b7d78439ac2f7376b6b09a554bdb8f675

export default App;
