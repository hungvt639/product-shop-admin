import { useCallback, useEffect, useState } from "react";
import API from "../../../api";
import { Product, CreateProduct } from "../../../api/repository/productAPI";
import { errorAPI } from "../../../components/Error";
import notify from "../../../components/notify";

const useProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [itemEdit, setItemEdit] = useState<Product>();
    const [showModel, setShowModel] = useState<boolean>(false);
    const getProduct = useCallback(async () => {
        try {
            const res = await API.product.getProducts();
            setProducts(res.data);
        } catch (e) {
            errorAPI(e);
        }
    }, []);

    useEffect(() => {
        getProduct();
    }, [getProduct]);
    const del = useCallback(async (id: string) => {
        try {
            await API.product.deleteProduct(id);
            setProducts((ts) => ts.filter((t) => t._id !== id));
        } catch (e) {
            errorAPI(e);
        }
    }, []);
    const fHandler = useCallback(
        async (data: CreateProduct, id: string | undefined) => {
            try {
                if (!id) {
                    const res = await API.product.createProduct(data);
                    setProducts((ts) => [...ts, res.data]);
                    setShowModel(false);
                    notify.success("Tạo mới sản phẩm thành công");
                } else {
                    const res = await API.product.editProduct(id, data);
                    setProducts((ts) => {
                        const index = ts.findIndex((t) => t._id === id);
                        return [
                            ...ts.slice(0, index),
                            res.data,
                            ...ts.slice(index + 1),
                        ];
                    });
                    setShowModel(false);
                    notify.success("Chỉnh sửa sản phẩm thành công");
                }
            } catch (e) {
                errorAPI(e);
            }
        },
        []
    );
    // const edit = useCallback(async (id: string, data: CreateProduct) => {
    //     try {
    //         const res = await API.product.editProduct(id, data);
    //         setProducts((ts) => {
    //             const index = ts.findIndex((t) => t._id === id);
    //             return [
    //                 ...ts.slice(0, index),
    //                 res.data,
    //                 ...ts.slice(index + 1),
    //             ];
    //         });
    //         setShowEdit(false);
    //         notify.success("Chỉnh sửa sản phẩm thành công");
    //     } catch (e) {
    //         errorAPI(e);
    //     }
    // }, []);

    // const changeIsSale = useCallback(async (data:Product) => {
    //     try {
    //         const res = await API.product.editProduct(id, data);
    //         setProducts((ts) => {
    //             const index = ts.findIndex((t) => t._id === id);
    //             return [
    //                 ...ts.slice(0, index),
    //                 res.data,
    //                 ...ts.slice(index + 1),
    //             ];
    //         });
    //         setShowEdit(false);
    //         notify.success("Chỉnh sửa sản phẩm thành công");
    //     } catch (e) {
    //         errorAPI(e);
    //     }
    // }, []);
    return {
        products,
        del,
        itemEdit,
        setItemEdit,
        showModel,
        setShowModel,
        fHandler,
    };
};
export default useProduct;
