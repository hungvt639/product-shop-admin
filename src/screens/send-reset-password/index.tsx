import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";
import { errorAPI } from "../../components/Error";
import notify from "../../components/notify";
import route from "../../router/route";
import "./send-reset-password.scss";
const SendResetPassword = () => {
    const [username, setUsername] = useState<string>("");
    const [valiUsername, setValiUsername] = useState<boolean>(false);
    const [ok, setOk] = useState<boolean>(false);

    // const history = useHistory();

    async function onSubmit(e: React.FormEvent) {
        setValiUsername(!username);
        e.preventDefault();
        if (username) {
            try {
                const res = await API.user.sendResetPassword({ username });
                for (const mess of res.data.message) {
                    notify.success(mess);
                    setOk(true);
                }
            } catch (err) {
                errorAPI(err);
            }
        }
    }

    return (
        <div className="send-reset-password">
            <div className="forms_">
                <h1>Quên mật khẩu</h1>
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

                    <button type="submit">Quên mật khẩu</button>
                    <p className="form-has-user">
                        Đã có tài khoản
                        <Link to={route.LOGIN}> Đăng nhập</Link>
                    </p>
                    <p className="form-has-user">
                        Không có tài khoản
                        <Link to={route.REGISTER}> Đăng ký ngay</Link>
                    </p>
                </form>
            </div>
            <div
                className={
                    ok
                        ? "modal-show-notification"
                        : "modal-show-notification-none"
                }
            >
                <div className="show-notification-send">
                    <p>
                        Chúng tôi đã gửi email tới bạn. Bạn vui lòng kiểm tra
                        email để cập nhật mật khẩu mới
                    </p>
                    <div className="show-notification-btn">
                        <button onClick={() => setOk(false)}>Cancel</button>
                        <button className="button-ok">
                            <Link onClick={() => setOk(false)} to={route.LOGIN}>
                                Ok
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SendResetPassword;
