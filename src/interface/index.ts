export interface UserInterface {
    _id: String;
    email: String;
    username: String;
    password: String;
    fullname?: String;
    address?: String;
    birthday?: Date;
    avatar?: string;
    isActivate?: boolean;
}
