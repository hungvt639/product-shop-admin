import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import route from "../../router/route";
import { checkRePassword, validateEmail } from "../../utils/validate";
import useRegister from "./hook/useRegister";
import "./style.scss";

const Register = () => {
    const { register, handleSubmit, getValues } = useForm();
    const {
        valiUsername,
        setValiUsername,
        valiPassword,
        setValiPassword,
        valiRePassword,
        setValiRePassword,
        valiEmail,
        setValiEmail,
        onSubmit,
    } = useRegister();

    return (
        <div className="_register">
            <div className="forms_">
                <h1>Đăng ký</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="form_">
                    <label>
                        <input
                            {...register("fullname")}
                            type="text"
                            name="fullname"
                            placeholder="Họ và Tên"
                        />
                        <p className="form-mess-err"></p>
                    </label>

                    <label>
                        <input
                            {...register("username")}
                            type="text"
                            name="username"
                            placeholder="Tài khoản đăng nhập"
                            onChange={(e) => {
                                setValiUsername(!e.target.value);
                            }}
                        />
                        {valiUsername ? (
                            <p className="form-mess-err">
                                Tài khoản không được để trống!
                            </p>
                        ) : (
                            <p className="form-mess-err"></p>
                        )}
                    </label>

                    <label>
                        <input
                            {...register("email")}
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => {
                                setValiEmail(!validateEmail(e.target.value));
                            }}
                        />
                        {valiEmail ? (
                            <p className="form-mess-err">
                                Định dạng email không đúng!
                            </p>
                        ) : (
                            <p className="form-mess-err"></p>
                        )}
                    </label>
                    <label>
                        <input
                            {...register("password")}
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            autoComplete="on"
                            onChange={(e) => {
                                setValiPassword(!e.target.value);
                            }}
                        />
                        {valiPassword ? (
                            <p className="form-mess-err">
                                Mật khẩu không được để trống!
                            </p>
                        ) : (
                            <p className="form-mess-err"></p>
                        )}
                    </label>
                    <label>
                        <input
                            {...register("rePassword")}
                            type="password"
                            name="rePassword"
                            placeholder="Nhập lại mật khẩu"
                            autoComplete="on"
                            onChange={(e) => {
                                setValiRePassword(
                                    !checkRePassword(
                                        getValues("password"),
                                        e.target.value
                                    )
                                );
                            }}
                        />
                        {valiRePassword ? (
                            <p className="form-mess-err">
                                Nhập lại mật khẩu không khớp!
                            </p>
                        ) : (
                            <p className="form-mess-err"></p>
                        )}
                    </label>

                    <button type="submit">Đăng ký</button>
                    <p className="form-has-user">
                        Đã có tài khoản{" "}
                        <Link to={route.LOGIN}>Đăng Nhập ngay</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default Register;
