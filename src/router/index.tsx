import React, { Suspense, useEffect, useState } from "react";
import routes from "./route";
import {
    Route,
    Redirect,
    Switch,
    BrowserRouter as Router,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./router.scss";
import { AppState } from "../interface/redux";
import { UserInterface } from "../interface";
import API from "../api";
import { AxiosResponse } from "axios";
import action from "../store/actions";

const Login = React.lazy(() => import("../screens/login"));
const Register = React.lazy(() => import("../screens/register"));
const PrivateRouter = React.lazy(() => import("./PrivateRouter"));
const ActivateUser = React.lazy(() => import("../screens/activate-user"));
const SendResetPassword = React.lazy(
    () => import("../screens/send-reset-password")
);
const ResetPassword = React.lazy(() => import("../screens/reset-password"));

export function WaitingComponent(
    Component: React.LazyExoticComponent<(props: any) => JSX.Element>
) {
    return (props: any) => (
        <Suspense fallback={<div>loading</div>}>
            <Component {...props} />
        </Suspense>
    );
}

const Routers = () => {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path={routes.LOGIN}
                    component={WaitingComponent(Login)}
                />
                <Route
                    exact
                    path={routes.REGISTER}
                    component={WaitingComponent(Register)}
                />
                <Route
                    exact
                    path={routes.ACTIVATE_USER}
                    component={WaitingComponent(ActivateUser)}
                />
                <Route
                    exact
                    path={routes.SEND_RESET_PASSWORD}
                    component={WaitingComponent(SendResetPassword)}
                />
                <Route
                    exact
                    path={routes.RESET_PASSWORD}
                    component={WaitingComponent(ResetPassword)}
                />
                <CheckLogin />
            </Switch>
        </Router>
    );
};
export default Routers;

const CheckLogin = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const token = useSelector((state: AppState) => state.userState.token);
    useEffect(() => {
        async function getProfile() {
            if (token) {
                try {
                    const res: AxiosResponse<UserInterface> =
                        await API.user.getProfile();

                    dispatch(action.setUser(res.data));
                } catch (e) {
                    dispatch(action.clearUser());
                    localStorage.removeItem("token");
                }
            }
        }
        getProfile();
        setLoading(false);
    }, [token, dispatch]);
    if (loading) {
        return <div>Loading...!</div>;
    }
    if (token)
        return (
            <Route
                path={routes.HOME}
                component={WaitingComponent(PrivateRouter)}
            />
        );
    else
        return (
            <Redirect
                to={{
                    pathname: routes.LOGIN,
                    search: `?next=${props.location.pathname}${props.location.search}`,
                }}
            />
        );
};
