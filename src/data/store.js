import { Reducers } from "./rootReducer";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";

const sagaMiddleWare = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  Reducers,
  composeEnhancer(applyMiddleware(sagaMiddleWare))
);

sagaMiddleWare.run(rootSaga);
