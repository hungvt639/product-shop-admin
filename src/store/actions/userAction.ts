import { UserInterface } from "../../api/repository/userAPI";
import { SET_USER, CLEAR_USER, SET_RES_LOGIN } from "../const";
import { Action } from "../interface";

class UserAction {
    public setResLogin = (user: UserInterface, token: string): Action => {
        return {
            type: SET_RES_LOGIN,
            user: user,
            token: token,
        };
    };
    public setUser = (user?: UserInterface): Action => {
        return {
            type: SET_USER,
            user: user,
        };
    };

    public clearUser = (): Action => {
        return {
            type: CLEAR_USER,
        };
    };
}

export default new UserAction();
