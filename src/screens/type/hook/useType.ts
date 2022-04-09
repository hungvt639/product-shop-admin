import { useCallback, useEffect, useState } from "react";
import API from "../../../api";
import { CreateType, Type } from "../../../api/repository/typeAPI";
import { errorAPI } from "../../../components/Error";
import notify from "../../../components/notify";

const useType = () => {
    const [types, setTypes] = useState<Type[]>([]);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [itemEdit, setItemEdit] = useState<Type>();
    const [showCreate, setShowCreate] = useState<boolean>(false);

    const getTypes = useCallback(async () => {
        try {
            const res = await API.type.getTypes();
            setTypes(res.data);
        } catch (e) {
            errorAPI(e);
        }
    }, []);

    useEffect(() => {
        getTypes();
    }, [getTypes]);

    const del = useCallback(async (id: string) => {
        try {
            await API.type.deleteType(id);
            setTypes((ts) => ts.filter((t) => t._id !== id));
        } catch (e) {
            errorAPI(e);
        }
    }, []);
    const create = useCallback(async (data: CreateType) => {
        try {
            const res = await API.type.createType(data);
            setTypes((ts) => [...ts, res.data]);
            setShowCreate(false);
            notify.success("Tạo mới loại sản phẩm thành công");
        } catch (e) {
            errorAPI(e);
        }
    }, []);
    const edit = useCallback(async (id: string, data: CreateType) => {
        try {
            const res = await API.type.editType(id, data);
            setTypes((ts) => {
                const index = ts.findIndex((t) => t._id === id);
                return [
                    ...ts.slice(0, index),
                    res.data,
                    ...ts.slice(index + 1),
                ];
            });
            setShowEdit(false);
            notify.success("Chỉnh sửa loại sản phẩm thành công");
        } catch (e) {
            errorAPI(e);
        }
    }, []);
    return {
        types,
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
export default useType;
