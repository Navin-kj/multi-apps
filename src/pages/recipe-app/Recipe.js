import React from "react";
import RecipeCard from "./RecipeCard";
import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import "./recipe.css";
import { useSelector } from "react-redux";
const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { theme } = useSelector((s) => s.theme);

  const searchRecipes = async () => {
    setIsLoading(true);
    const url = apiUrl + query;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setRecipes(data.meals);
    setIsLoading(false);
  };
  console.log({ isLoading });
  useEffect(() => {
    searchRecipes();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };
  return (
    <div
      className={`${theme === "dark" ? "dark-theme container2" : "container2"}`}
    >
      <h1>Recipe App</h1>
      <SearchBar
        handleSubmit={handleSubmit}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        isLoading={isLoading}
      />
      <div>
        {recipes ? (
          <div className="card-map">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div> No recipe </div>
        )}
      </div>
    </div>
  );
};

export default Recipe;
