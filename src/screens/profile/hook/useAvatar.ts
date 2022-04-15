import { useDispatch, useSelector } from "react-redux";
import action from "../../../store/actions";
import { useCallback, useState } from "react";
import notify from "../../../components/notify";
import { UserInterface } from "../../../api/repository/userAPI";
import { AppState } from "../../../store/interface";

const useAvatar = (user?: UserInterface) => {
    const dispatch = useDispatch();

    const token = useSelector((state: AppState) => state.userState.token);

    const [loading, setLoading] = useState<boolean>(false);

    const beforeUpload = useCallback((file: File) => {
        const type = ["image/jpeg", "image/png"];
        const check = type.includes(file.type);
        if (!check) {
            notify.error("Không hỗ trợ loại file này");
        }
        return check;
    }, []);

    const changeAvatar = useCallback(
        (info: any) => {
            if (info.file.status === "uploading") {
                setLoading(true);
                return;
            }
            if (info.file.status === "done") {
                dispatch(
                    action.setUser(
                        user
                            ? { ...user, avatar: info.file.response.avatar }
                            : undefined
                    )
                );
                setLoading(false);
                notify.success("Cập nhật ảnh đại diện thành công");
            }
        },
        [dispatch, user]
    );

    return {
        token,
        loading,
        beforeUpload,
        changeAvatar,
    };
};

export default useAvatar;
