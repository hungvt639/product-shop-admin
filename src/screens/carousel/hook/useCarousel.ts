import { useCallback, useEffect, useState } from "react";
import API from "../../../api";
import { CreateCarousel, Carousel } from "../../../api/repository/carouselAPI";
import { errorAPI } from "../../../components/Error";
import notify from "../../../components/notify";

const useCarousel = () => {
    const [carousels, setCarousel] = useState<Carousel[]>([]);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [itemEdit, setItemEdit] = useState<Carousel>();
    const [showCreate, setShowCreate] = useState<boolean>(false);

    const getCarousel = useCallback(async () => {
        try {
            const res = await API.carousel.getCarousels();
            setCarousel(res.data);
        } catch (e) {
            errorAPI(e);
        }
    }, []);

    useEffect(() => {
        getCarousel();
    }, [getCarousel]);

    const del = useCallback(async (id: string) => {
        try {
            await API.carousel.deleteCarousel(id);
            setCarousel((ts) => ts.filter((t) => t._id !== id));
        } catch (e) {
            errorAPI(e);
        }
    }, []);
    const create = useCallback(async (data: CreateCarousel) => {
        try {
            const res = await API.carousel.createCarousel(data);
            setCarousel((ts) => [...ts, res.data]);
            setShowCreate(false);
            notify.success("Tạo mới Carousel thành công");
        } catch (e) {
            errorAPI(e);
        }
    }, []);
    const edit = useCallback(async (id: string, data: CreateCarousel) => {
        try {
            const res = await API.carousel.editCarousel(id, data);
            setCarousel((ts) => {
                const index = ts.findIndex((t) => t._id === id);
                return [
                    ...ts.slice(0, index),
                    res.data,
                    ...ts.slice(index + 1),
                ];
            });
            setShowEdit(false);
            notify.success("Chỉnh sửa Carousel thành công");
        } catch (e) {
            errorAPI(e);
        }
    }, []);
    return {
        carousels,
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
export default useCarousel;
