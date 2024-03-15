import React, { useState, useEffect } from "react";

const BreweriesList = ({ onRandomBrewery }) => {
  const [allBreweries, setAllBreweries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

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

  //   useEffect(() => {
  //     if (allBreweries.length > 0) {
  //       onRandomBrewery(allBreweries);
  //     }
  //   }, [allBreweries, onRandomBrewery]);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       if (
  //         window.innerHeight + document.documentElement.scrollTop !==
  //           document.documentElement.offsetHeight ||
  //         hasMore
  //       )
  //         return;
  //       setPage((prevPage) => prevPage + 1);
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [hasMore]);

  return (
    <div>
      {allBreweries.map((brewery) => (
        <div key={brewery.id}>
          <h3>{brewery.name}</h3>
          <p>
            {brewery.street}, {brewery.city}, {brewery.state}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BreweriesList;
