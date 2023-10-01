import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Recipe from "./pages/recipe-app/Recipe";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./data/action/actions";
import MovieApp from "./pages/Movie";
import QRcodeGen from "./pages/QRcode";
import TodoList from "./pages/todo-list";
import Weather from "./pages/weather-app";
import DrawingApp from "./pages/Drawing-app";
import Stopwatch from "./pages/Stopwatch";
import Tictactoe from "./pages/Tictactoe";
import Fileconverter from "./pages/FileConverter";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();
  const { page, currenLangugage } = useSelector((s) => s.movies);
  useEffect(() => {
    dispatch(fetchMovies(page, currenLangugage));
  }, []);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/todo-list" component={TodoList} />
        <Route path="/recipe" component={Recipe} />
        <Route path="/movie" component={MovieApp} />
        <Route path="/weather" component={Weather} />
        <Route path="/qrcode" component={QRcodeGen} />
        <Route path="/drawing" component={DrawingApp} />
        <Route path="/fileconverter" component={Fileconverter} />
        <Route path="/tictactoe" component={Tictactoe} />
        <Route path="/stopwatch" component={Stopwatch} />
      </Switch>
    </Router>
  );
}

export default App;
