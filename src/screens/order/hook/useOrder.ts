import { useCallback, useEffect, useState } from "react";
import API from "../../../api";
import { Pagination } from "../../../api/interface";
import { Order } from "../../../api/repository/orderAPI";
import { errorAPI } from "../../../components/Error";
import notify from "../../../components/notify";

const useOrder = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [docs, setDocs] = useState<Pagination<Order>>();
    const [filter, setFilter] = useState({
        sort: "-_id",
        status: "",
    });
    const [pages, setPages] = useState({
        page: 1,
        limit: 5,
    });
    const getDocs = useCallback(async () => {
        try {
            const res = await API.order.gets({ ...pages, ...filter });
            setDocs(res.data);
        } catch (e) {
            errorAPI(e);
        }
    }, [filter, pages]);
    useEffect(() => {
        getDocs();
    }, [getDocs]);

    const changeData = useCallback(
        async (id: string, values: any, index: number) => {
            try {
                const res = await API.order.edit(id, values);
                setOrders([
                    ...orders.slice(0, index),
                    res.data,
                    ...orders.slice(index + 1),
                ]);
                notify.success("Cập nhật thành công");
            } catch (e) {
                errorAPI(e);
            }
        },
        [orders]
    );

    useEffect(() => {
        if (docs) setOrders(docs.docs);
    }, [docs]);
    return { orders, pages, setPages, docs, setFilter, changeData, filter };
};
export default useOrder;
