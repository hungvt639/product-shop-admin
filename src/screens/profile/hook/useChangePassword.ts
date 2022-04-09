import { useCallback, useState } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";
import API from "../../../api";
import { errorAPI } from "../../../components/Error";
import notify from "../../../components/notify";
import { DataChangePassword } from "../../../interface/api/UserAPI";
import { checkRePassword } from "../../../utils/validate";

export interface DataValiChangePassword extends DataChangePassword {
    re_password: string;
}

const useChangePassword = () => {
    const [showValidate, setShowValidate] = useState({
        oldPassword: false,
        password: false,
        rePassword: false,
        checkRePassword: false,
    });

    const changePassword = useCallback(
        async (
            data: DataValiChangePassword,
            reset: UseFormReset<FieldValues>
        ) => {
            const { old_password, password, re_password } = data;
            const checkRePass = checkRePassword(password, re_password);
            setShowValidate({
                oldPassword: !old_password,
                password: !password,
                rePassword: !re_password,
                checkRePassword: !checkRePass,
            });
            if (old_password && checkRePass) {
                try {
                    await API.user.changePassword({ old_password, password });
                    notify.success("Đổi mật khẩu thành công!");
                    reset({ old_password: "", password: "", re_password: "" });
                } catch (err) {
                    errorAPI(err);
                }
            }
        },
        []
    );

    return { showValidate, changePassword };
};

export default useChangePassword;
