import { AxiosResponse } from "axios";
import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import API from "../../api";
import { errorAPI } from "../../components/Error";
import notify from "../../components/notify";
import { ResponseResetPassword } from "../../interface/api/UserAPI";
import route from "../../router/route";
import { checkRePassword } from "../../utils/validate";
import "./reset-password.scss";
const ResetPassword = (props: any) => {
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");
    const [valiPassword, setValiPassword] = useState<boolean>(false);
    const [valiRePassword, setValiRePassword] = useState<boolean>(false);
    const history = useHistory();
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setValiPassword(!password);
        setValiRePassword(!checkRePassword(password, rePassword));
        if (checkRePassword(password, rePassword)) {
            try {
                const res: AxiosResponse<ResponseResetPassword> =
                    await API.user.resetPassword({
                        password: password,
                        reset_password_token:
                            props.location.search.split("=")[1],
                    });
                for (const m of res.data.message) {
                    notify.success(m);
                }
                history.push(route.LOGIN);
            } catch (err) {
                errorAPI(err);
            }
        }
    }
    return (
        <div className="reset-password">
            <div className="forms_">
                <h1>Cập nhật mật khẩu</h1>
                <form onSubmit={(e) => onSubmit(e)} className="form_">
                    <label>
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setValiPassword(!e.target.value);
                            }}
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            autoComplete="on"
                        />
                        {valiPassword ? (
                            <p className="form-mess-err">
                                Mật khẩu không được để trống!
                            </p>
                        ) : (
                            <Fragment />
                        )}
                    </label>
                    <label>
                        <input
                            value={rePassword}
                            onChange={(e) => {
                                setRePassword(e.target.value);
                                setValiRePassword(
                                    !checkRePassword(password, e.target.value)
                                );
                            }}
                            type="password"
                            name="re-password"
                            placeholder="Nhập lại mật khẩu"
                            autoComplete="on"
                        />
                        {valiRePassword ? (
                            <p className="form-mess-err">
                                Nhập lại mật khẩu không khớp!
                            </p>
                        ) : (
                            <Fragment />
                        )}
                    </label>
                    <button type="submit">Cập nhật mật khẩu</button>
                    <p className="form-has-user">
                        Đã có tài khoản{" "}
                        <Link to={route.LOGIN}>Đăng Nhập ngay</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default ResetPassword;
