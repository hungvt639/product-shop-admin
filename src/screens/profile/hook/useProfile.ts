import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../../api";
import { UserInterface } from "../../../api/repository/userAPI";
import { errorAPI } from "../../../components/Error";
import { AppState } from "../../../store/interface";

const useProfile = (_id: any) => {
    const idUser = useSelector((state: AppState) => state.userState.user?._id);
    const user = useSelector((state: AppState) => state.userState.user);

    const [profile, setProfile] = useState<UserInterface | undefined>();

    const fetchUser = useCallback(async () => {
        if (_id === idUser) {
            setProfile(user);
        } else {
            try {
                const res = await API.user.getUser(_id, "");
                setProfile(res.data);
            } catch (e) {
                errorAPI(e);
            }
        }
    }, [_id, idUser, user]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { profile };
};

export default useProfile;
