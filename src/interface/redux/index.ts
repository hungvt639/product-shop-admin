import store from "../../store";
import { UserInterface } from "..";
import { DataLogin } from "../api/UserAPI";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

//State gốc
export interface AppState {
    userState: UserState;
}

export interface UserState {
    user?: UserInterface;
    token?: string | null;
}

export interface Action {
    type: string;
    user?: UserInterface;
    token?: string | null;
    dataLogin?: DataLogin;
}

// export const initStateRedux: AppState = {
//     userState: { user: undefined, token: localStorage.getItem("token") },
// };
