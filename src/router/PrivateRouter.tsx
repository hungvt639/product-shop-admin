import React from "react";
import Header from "../common/header";
import Sider from "../common/sider";
import { Route, Switch } from "react-router-dom";
import { WaitingComponent } from ".";
import route from "./route";
const Profile = React.lazy(() => import("../screens/profile"));
const Home = React.lazy(() => import("../screens/home"));

const Product = React.lazy(() => import("../screens/product"));
const Type = React.lazy(() => import("../screens/type"));
const Color = React.lazy(() => import("../screens/color"));
const Size = React.lazy(() => import("../screens/size"));
const Carousel = React.lazy(() => import("../screens/carousel"));
const Order = React.lazy(() => import("../screens/order"));

const PrivateRouter = () => {
    return (
        <>
            <Header />
            <div className="content">
                <div className="w-full h-full flex flex-row">
                    <Sider />
                    <div className="flex-1 h-full overflow-hidden">
                        <Switch>
                            <Route
                                exact
                                path={route.USER_PROFILE_ROUTER}
                                component={WaitingComponent(Profile)}
                            />

                            <Route
                                exact
                                path={route.PRODUCT}
                                component={WaitingComponent(Product)}
                            />
                            <Route
                                exact
                                path={route.TYPE}
                                component={WaitingComponent(Type)}
                            />
                            <Route
                                exact
                                path={route.COLOR}
                                component={WaitingComponent(Color)}
                            />
                            <Route
                                exact
                                path={route.SIZE}
                                component={WaitingComponent(Size)}
                            />
                            <Route
                                exact
                                path={route.CAROUSEL}
                                component={WaitingComponent(Carousel)}
                            />
                            <Route
                                exact
                                path={route.ORDER}
                                component={WaitingComponent(Order)}
                            />
                            <Route
                                path={route.HOME}
                                component={WaitingComponent(Home)}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivateRouter;
