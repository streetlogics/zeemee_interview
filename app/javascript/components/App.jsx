import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CocktailList from "./CocktailList";
import CocktailDetail from "./CocktailDetail";
import Header from "./Header";
import backgroundImage from "../images/bg.jpg";
import "@fontsource/varela-round";

const App = () => {
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    setQuery(searchInput);
    navigate("/");
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        fontFamily: "Varela Round, sans-serif",
      }}
    >
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />
      <Routes>
        <Route
          path="/"
          element={<CocktailList query={query} setQuery={setQuery} />}
        />
        <Route path="/share/:id/:slug" element={<CocktailDetail />} />
      </Routes>
    </div>
  );
};

export default App;
