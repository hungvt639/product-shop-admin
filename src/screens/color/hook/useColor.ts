import { useCallback, useEffect, useState } from "react";
import API from "../../../api";
import { Color, CreateColor } from "../../../api/repository/colorAPI";
import { errorAPI } from "../../../components/Error";
import notify from "../../../components/notify";

const useColor = () => {
    const [colors, setColors] = useState<Color[]>([]);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [itemEdit, setItemEdit] = useState<Color>();
    const [showCreate, setShowCreate] = useState<boolean>(false);

    const getColor = useCallback(async () => {
        try {
            const res = await API.color.getColor();
            setColors(res.data);
        } catch (e) {
            errorAPI(e);
        }
    }, []);

    useEffect(() => {
        getColor();
    }, [getColor]);

    const del = useCallback(async (id: string) => {
        try {
            await API.color.deleteColor(id);
            setColors((value) => value.filter((val) => val._id !== id));
        } catch (e) {
            errorAPI(e);
        }
    }, []);
    const create = useCallback(async (data: CreateColor) => {
        try {
            const res = await API.color.createColor(data);
            setColors((ts) => [...ts, res.data]);
            setShowCreate(false);
            notify.success("Tạo mới màu sắc thành công");
        } catch (e) {
            errorAPI(e);
        }
    }, []);
    const edit = useCallback(async (id: string, data: CreateColor) => {
        try {
            const res = await API.color.editColor(id, data);
            setColors((value) => {
                const index = value.findIndex((val) => val._id === id);
                return [
                    ...value.slice(0, index),
                    res.data,
                    ...value.slice(index + 1),
                ];
            });
            setShowEdit(false);
            notify.success("Chỉnh sửa màu sắc thành công");
        } catch (e) {
            errorAPI(e);
        }
    }, []);

    return {
        colors,
        del,
        showEdit,
        setShowEdit,
        itemEdit,
        setItemEdit,
        edit,
        showCreate,
        setShowCreate,
        create,
    };
};
export default useColor;
