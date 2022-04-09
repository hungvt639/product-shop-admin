import { AxiosResponse } from "axios";
import { UserInterface } from "..";

export interface DataRegister {
    email: string;
    username: string;
    password: string;
    fullname: string;
    address: string;
    birthday: Date;
}

export interface ResponseRegister {
    message: string[];
}

export interface DataActivateUser {
    active_token: string;
}

export interface ResponseActivateUser {
    message: string;
}

export interface DataLogin {
    username: string;
    password: string;
}

export interface ResponseLogin {
    token: string;
    user: UserInterface;
}

export interface DataSendResetPassword {
    username: string;
}

export interface ResponseSendResetPassword {
    message: string[];
}

export interface DataResetPassword {
    password: string;
    reset_password_token: string;
}

export interface ResponseResetPassword {
    message: string;
}

export interface DataChangePassword {
    old_password: string;
    password: string;
}

export interface ResponseChangePassword {
    message: string[];
}

export default interface UserRepositoryInterface {
    register: (data: DataRegister) => Promise<AxiosResponse<ResponseRegister>>;
    activateUser: (
        data: DataActivateUser
    ) => Promise<AxiosResponse<ResponseActivateUser>>;
    sendResetPassword: (
        data: DataSendResetPassword
    ) => Promise<AxiosResponse<ResponseSendResetPassword>>;
    resetPassword: (
        data: DataResetPassword
    ) => Promise<AxiosResponse<ResponseResetPassword>>;
    login: (data: DataLogin) => Promise<AxiosResponse<ResponseLogin>>;
    getProfile: () => Promise<AxiosResponse<UserInterface>>;
    changePassword: (
        data: DataChangePassword
    ) => Promise<AxiosResponse<ResponseChangePassword>>;
    getUsers: () => Promise<AxiosResponse<UserInterface[]>>;
    getUser: (
        id: String,
        option: string
    ) => Promise<AxiosResponse<UserInterface>>;
}
