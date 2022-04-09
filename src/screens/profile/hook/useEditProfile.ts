import { useCallback, useState } from "react";

const useEditProfile = () => {
    const [showEdit, setShowEdit] = useState<boolean>(false);

    const editProfile = useCallback(async (data: any) => {
        console.log(data);
    }, []);

    return { showEdit, setShowEdit, editProfile };
};

export default useEditProfile;
