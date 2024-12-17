import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import CopyIcon from "../images/Copy-Icon.svg";
import CheckIcon from "../images/Check-Icon.svg";

const CocktailDetail = () => {
  const { id, slug } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const navigate = useNavigate();
  const shareUrl = `${window.location.origin}/share/${id}/${slug}`;

  useEffect(() => {
    fetchCocktailDetail();
  }, [id]);

  const fetchCocktailDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/detail?id=${id}`);
      if (!response.ok) {
        console.error("Network response was not ok", response);
        navigate("/");
      }
      const data = await response.json();
      if (!data) {
        navigate("/");
      } else {
        setCocktail(data["drinks"][0]);
      }
    } catch (error) {
      console.error("Error fetching cocktail details:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="container cocktail-details-container">
      <h1 className="cocktail-name">{cocktail.name}</h1>
      <div className="cocktail-details-box">
        <div className="cocktail-ingredients-box">
          <img src={cocktail.image} alt={cocktail.name} />
          <div className="ingredients-list">
            <div className="total-ingredients">
              {cocktail.ingredients.length}{" "}
              {cocktail.ingredients.length === 1 ? "Ingredient" : "Ingredients"}
            </div>
            <div className="ingredients-grid">
              {cocktail.ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-item">
                  {ingredient.measurement} {ingredient.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="category-box">{cocktail.category}</div>
        <h2>Instructions</h2>
        <p>{cocktail.instructions}</p>
        {cocktail.container && (
          <>
            <h2>Glass Needed</h2>
            Serve: {cocktail.container}
          </>
        )}
        <div className="share-box">
          {linkCopied ? <h2>Share link copied</h2> : <h2>Share Link</h2>}
          <div className="share-link-container">
            <input
              type="text"
              className="share-link-input"
              value={shareUrl}
              readOnly
            />
            <button
              className="button background-primary copy-button"
              onClick={handleCopyLink}
            >
              <img
                src={linkCopied ? CheckIcon : CopyIcon}
                alt={linkCopied ? "Check Icon" : "Copy Icon"}
                className="copy-icon"
              />
              {linkCopied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;
