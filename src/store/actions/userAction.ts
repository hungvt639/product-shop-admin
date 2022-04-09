import { UserInterface } from "../../interface";
import { DataLogin } from "../../interface/api/UserAPI";
import { Action } from "../../interface/redux";
import { SET_USER, CLEAR_USER, SET_LOGIN, SET_RES_LOGIN } from "../const";

const setResLogin = (user: UserInterface, token: string): Action => {
    return {
        type: SET_RES_LOGIN,
        user: user,
        token: token,
    };
};
const setUser = (user?: UserInterface): Action => {
    return {
        type: SET_USER,
        user: user,
    };
};

const clearUser = (): Action => {
    return {
        type: CLEAR_USER,
    };
};

const setLogin = (data: DataLogin): Action => {
    return {
        type: SET_LOGIN,
        dataLogin: data,
    };
};

const userAction = {
    setResLogin,
    setUser,
    clearUser,
    setLogin,
};
export default userAction;
