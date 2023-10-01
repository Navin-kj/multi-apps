export const FETCH_MOVIES = "FETCH_MOVIES";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAIL = "FETCH_MOVIES_FAIL";

export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_ALL_TODO = "DELETE_ALL_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const TOGGLE_THEME = "TOGGLE_THEME";

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: text,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const deleteAllTodo = () => ({
  type: DELETE_ALL_TODO,
});
export const editTodo = (id, newText) => ({
  type: EDIT_TODO,
  payload: { id, newText },
});

export const fetchMovies = (page, language) => ({
  type: FETCH_MOVIES,
  payload: { page, language },
});

export const fetchMoviesSuccess = (movies) => ({
  type: FETCH_MOVIES,
  payload: movies,
});
export const fetchMoviesFail = (error) => ({
  type: FETCH_MOVIES,
  payload: error,
});
export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});
