import {
  FETCH_MOVIES,
  FETCH_MOVIES_FAIL,
  FETCH_MOVIES_SUCCESS,
} from "../action/actions";

const initialState = {
  movies: [],
  currenLanguage: "en",
  loading: false,
  currentpage: 1,
  totalPages: 0,
  error: false,
};

export const PopularMovies = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload.results,
        loading: false,
        error: null,
        currenLanguage: action.payload.language,
        currentpage: action.payload.page,
        totalPages: action.payload.total_pages,
      };
    case FETCH_MOVIES_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
