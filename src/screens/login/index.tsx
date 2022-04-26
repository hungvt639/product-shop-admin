import "./style.scss";
import { Fragment } from "react";
// import route from "../../router/route";
// import { Link } from "react-router-dom";
import useLogin from "./hook/useLogin";
const LoginForm = (props: any) => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        valiUsername,
        setValiUsername,
        valiPassword,
        setValiPassword,
        onSubmit,
    } = useLogin(props);

    return (
        <div className="_login">
            <div className="forms_">
                <h1>Đăng nhập</h1>
                <form onSubmit={(e) => onSubmit(e)} className="form_">
                    <label>
                        Tài khoản đăng nhập (*)
                        <br />
                        <input
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setValiUsername(!e.target.value);
                            }}
                            type="text"
                            name="username"
                            placeholder="Tài khoản đăng nhập"
                        />
                        {valiUsername ? (
                            <p className="form-mess-err">
                                Tài khoản không được để trống!
                            </p>
                        ) : (
                            <Fragment />
                        )}
                    </label>

                    <label>
                        Mật khẩu (*)
                        <br />
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
                    {/* <div className="forgot-password">
                        <Link to={route.SEND_RESET_PASSWORD}>
                            Quên mật khẩu
                        </Link>
                    </div> */}
                    <button type="submit">Đăng nhập</button>
                    {/* <p className="form-has-user">
                        Không có tài khoản{" "}
                        <Link to={route.REGISTER}>Đăng ký ngay</Link>
                    </p> */}
                </form>
            </div>
        </div>
    );
};
export default LoginForm;
