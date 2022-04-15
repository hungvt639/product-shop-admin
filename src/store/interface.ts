import store from ".";
import { UserInterface } from "../api/repository/userAPI";

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
}
