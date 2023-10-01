import React from "react";
import "./recipe.css";

const RecipeCard = ({ recipe }) => {
  const { idMeal, strMeal, strCategory, strMealThumn } = recipe;
  return (
    <div className="card">
      <div className="header">
        <img src={strMealThumn} alt={strMeal} classNameName="card-img" />
      </div>
      <span className="category">Category: {strCategory}</span>
      <a href={"https://www.themealdb.com/meal/" + idMeal}>Let's Cook!</a>
    </div>
  );
};

export default RecipeCard;
