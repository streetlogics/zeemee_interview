import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchCocktails();
    console.log("loaded cocktail list");
  }, [index, query]);

  const fetchCocktails = async () => {
    try {
      const response = await fetch(
        `/api/search?index=${index}&limit=${limit}&query=${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCocktails(data.drinks);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Error fetching cocktails:", error);
    }
  };

  return (
    <div>
      <h1>Cocktail List</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cocktails..."
      />
      {cocktails.length === 0 ? (
        <p>No cocktails found. Try a different search term.</p>
      ) : (
        <ul>
          {cocktails.map((cocktail) => (
            <li key={cocktail.id}>
              <Link to={`/cocktail/${cocktail.id}`}>{cocktail.name}</Link>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setIndex(index - limit)} disabled={index <= 0}>
        Previous
      </button>
      <button
        onClick={() => setIndex(index + limit)}
        disabled={index + limit >= totalCount}
      >
        Next
      </button>
    </div>
  );
};

export default CocktailList;
