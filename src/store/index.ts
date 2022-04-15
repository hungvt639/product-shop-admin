import { createStore } from "redux";
import reducer from "./reduces";
// import {initStateRedux} from './appstate'
const store = createStore(reducer, undefined);

export default store;
