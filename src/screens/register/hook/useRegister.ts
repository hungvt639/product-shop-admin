import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../../../api";
import { DataRegister } from "../../../api/repository/userAPI";
import { errorAPI } from "../../../components/Error";
import notify from "../../../components/notify";
import route from "../../../router/route";
import { checkRePassword, validateEmail } from "../../../utils/validate";

interface DataFormRegister extends DataRegister {
    rePassword: string;
}

const useRegister = () => {
    const history = useHistory();

    const [valiUsername, setValiUsername] = useState<boolean>(false);
    const [valiPassword, setValiPassword] = useState<boolean>(false);
    const [valiRePassword, setValiRePassword] = useState<boolean>(false);
    const [valiEmail, setValiEmail] = useState<boolean>(false);

    const onSubmit = useCallback(
        async (data: DataFormRegister) => {
            setValiUsername(!data.username);
            setValiPassword(!data.password);
            setValiRePassword(!checkRePassword(data.password, data.rePassword));
            setValiEmail(!validateEmail(data.email));
            if (
                data.username &&
                data.password &&
                data.rePassword &&
                data.email &&
                validateEmail(data.email) &&
                checkRePassword(data.password, data.rePassword)
            ) {
                try {
                    const res = await API.user.register(data);
                    console.log(res);
                    notify.success(
                        "Đăng ký tài khoản thành công, vui lòng đăng nhập để sử dụng dịch vụ"
                    );
                    history.push(route.LOGIN);
                } catch (err) {
                    errorAPI(err);
                }
            }
        },
        [history]
    );

    return {
        valiUsername,
        setValiUsername,
        valiPassword,
        setValiPassword,
        valiRePassword,
        setValiRePassword,
        valiEmail,
        setValiEmail,
        onSubmit,
    };
};

export default useRegister;
