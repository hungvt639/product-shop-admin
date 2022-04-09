const USER_PROFILE = "/user";

const route = {
    LOGIN: "/login",
    REGISTER: "/register",
    SEND_RESET_PASSWORD: "/send_reset-password",
    RESET_PASSWORD: "/reset-password",
    ACTIVATE_USER: "/activate-user",
    HOME: "/",

    PROFILE: "/user/profile",
    USER_PROFILE: USER_PROFILE,
    USER_PROFILE_ROUTER: `${USER_PROFILE}/:id`,

    PRODUCT: "/product",
    TYPE: "/type",
    COLOR: "/color",
    SIZE: "/size",
    ORDER: "/order",
    CAROUSEL: "/carousel",
};
export default route;
