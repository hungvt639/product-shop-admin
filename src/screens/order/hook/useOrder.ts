import { useCallback, useEffect, useState } from "react";
import API from "../../../api";
import { Order } from "../../../api/repository/orderAPI";
import { errorAPI } from "../../../components/Error";

const useOrder = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const getOrder = useCallback(async () => {
        try {
            const res = await API.order.get();
            setOrders(res.data);
        } catch (e) {
            errorAPI(e);
        }
    }, []);
    useEffect(() => {
        getOrder();
    }, [getOrder]);
    return { orders };
};
export default useOrder;
