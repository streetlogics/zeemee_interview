import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PrevIcon from "../images/Prev-Icon.svg";
import NextIcon from "../images/Next-Icon.svg";
import Loading from "./Loading";

const CocktailList = ({ query, setQuery }) => {
  const [cocktails, setCocktails] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 6;

  const fetchCocktails = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCocktails();
  }, [index, query]);

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  if (loading) {
    return <Loading searching />;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>{query ? `Search: ${query}` : "All Drinks"}</h1>
        {query && <span className="result-count">{totalCount} results</span>}
      </div>
      <div className="grid">
        {cocktails.map((cocktail) => {
          const slug = createSlug(cocktail.name);
          return (
            <Link
              to={`/share/${cocktail.id}/${slug}`}
              key={cocktail.id}
              className="card"
            >
              <img src={cocktail.image} alt={cocktail.name} />
              <div className="card-content">
                <h3>{cocktail.name}</h3>
                <div className="category-box">{cocktail.category}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <div
        className="nav-icon"
        onClick={() => index > 0 && setIndex(index - limit)}
        style={{ opacity: index <= 0 ? 0.5 : 1 }}
      >
        <img src={PrevIcon} alt="Previous" />
      </div>
      <div
        className="nav-icon"
        onClick={() => index + limit < totalCount && setIndex(index + limit)}
        style={{ opacity: index + limit >= totalCount ? 0.5 : 1 }}
      >
        <img src={NextIcon} alt="Next" />
      </div>
    </div>
  );
};

export default CocktailList;
