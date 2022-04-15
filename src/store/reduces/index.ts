import { combineReducers } from "redux";
import { ReducersMapObject } from "redux";
import { Action, AppState } from "../interface";
import userReduce from "./userReducer";

const map: ReducersMapObject<AppState, Action> = {
    userState: userReduce,
};

const reducer = combineReducers(map);
export default reducer;
