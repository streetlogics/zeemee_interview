import React from "react";
import { Routes, Route } from "react-router-dom";
import CocktailList from "./CocktailList";
import CocktailDetail from "./CocktailDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CocktailList />} />
      <Route path="/cocktail/:id" element={<CocktailDetail />} />
    </Routes>
  );
};

export default App;
