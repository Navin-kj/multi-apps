import React from "react";
import { useSelector } from "react-redux";
import Cards from "./components/Cards";
import "./components/style.css";
const MovieApp = () => {
  const { movies } = useSelector((s) => s.movies);
  const { theme } = useSelector((s) => s.theme);
  return (
    <div
      className={`${theme === "dark" ? "dark-theme movie-apps" : "movie-apps"}`}
    >
      <h1 className="movie-tab">Popular movies</h1>
      <div className="card-tils-1">
        {movies && movies.map((item) => <Cards key={item} {...item} />)}
      </div>
    </div>
  );
};

export default MovieApp;
