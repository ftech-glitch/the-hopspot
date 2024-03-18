import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Details.module.css";
import cheers from "./cheers.png";
import glass from "./glass.png";
import Search from "./Search";

const Home = () => {
  const [randomBrewery, setRandomBrewery] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allBreweries, setAllBreweries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // fetch brewery list
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

  // generate a random brewery from brewery list
  const getRandomBrewery = () => {
    if (allBreweries.length > 0) {
      const randomIndex = Math.floor(Math.random() * allBreweries.length);
      setRandomBrewery(allBreweries[randomIndex]);
      setShowModal(true);
    }
  };

  // close random brewery modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // format phone number
  const formatNumber = (phoneStr) => {
    let cleaned = ("", phoneStr).replace(/\D/g, "");

    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }

    return null;
  };

  // ------------------------ adding data from open brewery list to airtable ------------------------ //
  // before adding a new record, fetch existing records from airtable to check if the record already exists
  // const checkForDuplicate = async (brewery) => {
  //   const url = `https://api.airtable.com/v0/appQPGY7SNCdqDtdV/Table%201?filterByFormula=AND({Name} = '${brewery.name}', {City} = '${brewery.city}')`;

  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer patxkA4uOl3Cyh9sV.adcda182ede1acc1b0a6684224f61b1b7d78439ac2f7376b6b09a554bdb8f675`,
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await response.json();
  //   return data.records.length > 0;
  // };

  // post & match brewery and airtable fields
  // const postBreweryToAirtable = async (brewery) => {
  //   const isDuplicate = await checkForDuplicate(brewery);
  //   if (isDuplicate) {
  //     console.log(`Duplicate brewery found: ${brewery.name}`);
  //     return; // skip adding if a duplicate is found
  //   }
  //   const url = `https://api.airtable.com/v0/appQPGY7SNCdqDtdV/Table%201`;

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer patxkA4uOl3Cyh9sV.adcda182ede1acc1b0a6684224f61b1b7d78439ac2f7376b6b09a554bdb8f675`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       fields: {
  //         Name: brewery.name,
  //         Type: brewery.brewery_type,
  //         City: brewery.city,
  //         State: brewery.state_province,
  //         Address: brewery.street,
  //         Postal: brewery.postal_code,
  //         Contact: brewery.phone,
  //         Website: brewery.website_url,
  //       },
  //     }),
  //   });

  //   if (!response.ok) {
  //     throw new Error(
  //       `Failed to post brewery to Airtable: ${response.statusText}`
  //     );
  //   }

  //   return response.json();
  // };

  // add all breweries to airtable
  // const addBreweriesToAirtable = async () => {
  //   for (const brewery of allBreweries) {
  //     try {
  //       await postBreweryToAirtable(brewery);
  //       console.log(`Added brewery: ${brewery.name}`);
  //     } catch (error) {
  //       console.error(`Error adding brewery: ${error.message}`);
  //     }
  //   }
  // };

  // automatically add all breweries to airtable after fetching
  // useEffect(() => {
  //   if (!loading && !hasMore) addBreweriesToAirtable();
  // }, [loading, hasMore]);

  return (
    <>
      <br />
      <div className="image-container">
        <img src={cheers} alt="cheers" className="cheers" />
      </div>
      <br />
      <br />
      <h1 className="header">Discover Your Next HopSpot</h1>
      <h5 className="subheader">Connecting beer enthusiasts with breweries</h5>
      <br />
      <br />
      {/* buttons */}
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
      {/* random brewery modal */}
      {randomBrewery && showModal && (
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <div className="row align-items-center">
              <div className="col-md-3 text-center">
                <img src={glass} alt="glass" className="glass" />
              </div>
              <div className="col-md-6 text-center">
                <h5 className="random-brewery">Your Brewery of the Day </h5>
              </div>
              <div className="col-md-3 text-center">
                <img src={glass} alt="glass" className="glass" />
              </div>
            </div>
            <br />
            <p className="modal-text">Name: {randomBrewery.name}</p>

            <p className="modal-text">
              Address:{" "}
              <a
                href={`https://www.google.com/maps?q=${randomBrewery.street},${randomBrewery.postal_code}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {randomBrewery.street}, {randomBrewery.postal_code},{" "}
                {randomBrewery.city}, {randomBrewery.state}
              </a>
            </p>
            <p className="modal-text">
              Phone: {formatNumber(randomBrewery.phone)}
            </p>
            <p className="modal-text">
              Website:{" "}
              <a
                href={randomBrewery.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {randomBrewery.website_url}
              </a>
            </p>
            <div className={styles.buttonGroup}>
              <button className={styles.modalButton} onClick={handleCloseModal}>
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
