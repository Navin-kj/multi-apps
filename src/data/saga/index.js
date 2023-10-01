import axios from "axios";
import {
  FETCH_MOVIES,
  FETCH_MOVIES_FAIL,
  FETCH_MOVIES_SUCCESS,
} from "../action/actions";
import { call, all, put, takeLatest } from "redux-saga/effects";

const API_KEY = "c34ccd80e51954f1828f5f6f154a059e";
const BASE_URL = "https://api.themoviedb.org/3";

function* fetchPopularMovies(action) {
  try {
    const response = yield call(
      axios.get,
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${action.payload.language}&page=${action.payload.page}`
    );
    yield put({ type: FETCH_MOVIES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_MOVIES_FAIL, payload: error });
  }
}

function* watchFetchMovies() {
  yield takeLatest(FETCH_MOVIES, fetchPopularMovies);
}

export default function* rootSaga() {
  yield all([watchFetchMovies()]);
}
