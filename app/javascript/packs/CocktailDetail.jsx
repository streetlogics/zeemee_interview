import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CocktailDetail = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    fetchCocktailDetail();
  }, [id]);

  const fetchCocktailDetail = async () => {
    try {
      const response = await fetch(`/api/detail?id=${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCocktail(data);
    } catch (error) {
      console.error("Error fetching cocktail details:", error);
    }
  };

  if (!cocktail) return <div>Loading...</div>;

  return (
    <div>
      <h1>{cocktail.name}</h1>
      <img src={cocktail.image} alt={cocktail.name} />
      <p>Category: {cocktail.category}</p>
      <p>Container: {cocktail.container}</p>
      <p>Instructions: {cocktail.instructions}</p>
      <h2>Ingredients</h2>
      <ul>
        {cocktail.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.measurement}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CocktailDetail;
