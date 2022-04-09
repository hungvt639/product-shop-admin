import { useCallback, useEffect, useState } from "react";
import API from "../../../api";
import { CreateSize, Size } from "../../../api/repository/sizeAPI";
import { errorAPI } from "../../../components/Error";
import notify from "../../../components/notify";

const useSize = () => {
    const [sizes, setSize] = useState<Size[]>([]);
    const [showCreate, setShowCreate] = useState<boolean>(false);
    const getSizes = useCallback(async () => {
        try {
            const res = await API.size.getSizes();
            setSize(res.data);
        } catch (e) {
            errorAPI(e);
        }
    }, []);

    useEffect(() => {
        getSizes();
    }, [getSizes]);

    const del = useCallback(async (id: string) => {
        try {
            await API.color.deleteColor(id);
            setSize((value) => value.filter((val) => val._id !== id));
        } catch (e) {
            errorAPI(e);
        }
    }, []);
    const create = useCallback(async (data: CreateSize) => {
        try {
            const res = await API.size.createSize(data);
            setSize((ts) => [...ts, res.data]);
            setShowCreate(false);
            notify.success("Tạo mới size thành công");
        } catch (e) {
            errorAPI(e);
        }
    }, []);

    return { sizes, del, showCreate, setShowCreate, create };
};
export default useSize;
