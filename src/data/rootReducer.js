import { combineReducers } from "redux";
import { PopularMovies } from "./reducer/movieReducer";
import todoReducer from "./reducer/todoReducer";
import themeReducer from "./reducer/themeReducer";

export const Reducers = combineReducers({
  movies: PopularMovies,
  todo: todoReducer,
  theme: themeReducer,
});
