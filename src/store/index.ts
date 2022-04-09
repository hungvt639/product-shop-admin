import { createStore, applyMiddleware } from "redux";
import reducer from "./reduces";
import createSagaMiddleware from "@redux-saga/core";
import mySaga from "./saga";
// import {initStateRedux} from './appstate'
const saga = createSagaMiddleware();
const store = createStore(reducer, undefined, applyMiddleware(saga));

saga.run(mySaga);

export default store;
