import React from "react";
import SearchIcon from "../images/Search-Icon.svg";

const Header = ({ searchInput, setSearchInput, handleSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header>
      <div className="header-content">
        <h1 className="logo">BarCraft</h1>
        <div className="search-container">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              borderRight: "1px solid white",
            }}
          >
            <img src={SearchIcon} alt="Search" className="search-icon" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search all drinks"
              className="search-bar"
            />
          </div>
          <button className="go-button" onClick={handleSearch}>
            GO
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
