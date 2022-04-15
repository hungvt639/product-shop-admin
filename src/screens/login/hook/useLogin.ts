import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import API from "../../../api";
import action from "../../../store/actions";
import notify from "../../../components/notify";
import route from "../../../router/route";
import { errorAPI } from "../../../components/Error";

const useLogin = (props: any) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [valiUsername, setValiUsername] = useState<boolean>(false);
    const [valiPassword, setValiPassword] = useState<boolean>(false);

    const onSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (username && password) {
                try {
                    const res = await API.user.login({
                        username,
                        password,
                    });
                    localStorage.setItem("token", res.data.token);
                    dispatch(action.setResLogin(res.data.user, res.data.token));
                    notify.success("Đăng nhập thành công!");
                    const backTo: string = props.location.search;
                    if (backTo) {
                        history.push(backTo.slice(6));
                    } else {
                        history.push(route.HOME);
                    }
                } catch (err) {
                    errorAPI(err);
                }
            }
        },
        [dispatch, history, password, props.location.search, username]
    );

    return {
        username,
        setUsername,
        password,
        setPassword,
        valiUsername,
        setValiUsername,
        valiPassword,
        setValiPassword,
        onSubmit,
    };
};
export default useLogin;
