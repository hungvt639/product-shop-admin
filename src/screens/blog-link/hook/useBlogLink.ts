import { useCallback, useEffect, useState } from "react";
import API from "../../../api";
import { BlogLink, CreateBlogLink } from "../../../api/repository/blogLinkAPI";
import { errorAPI } from "../../../components/Error";
import notify from "../../../components/notify";

const useSize = () => {
    const [blogs, setBlogs] = useState<BlogLink[]>([]);
    const [showCreate, setShowCreate] = useState<boolean>(false);
    const [itemEdit, setItemEdit] = useState<BlogLink>();

    const getBlogs = useCallback(async () => {
        try {
            const res = await API.blog_link.gets();
            setBlogs(res.data);
        } catch (e) {
            errorAPI(e);
        }
    }, []);

    useEffect(() => {
        getBlogs();
    }, [getBlogs]);

    const del = useCallback(async (id: string) => {
        try {
            await API.blog_link.del(id);
            setBlogs((value) => value.filter((val) => val._id !== id));
        } catch (e) {
            errorAPI(e);
        }
    }, []);
    // const create = useCallback(async (data: CreateBlogLink) => {
    //     try {
    //         const res = await API.blog_link.create(data);
    //         setBlogs((ts) => [...ts, res.data]);
    //         setShowCreate(false);
    //         notify.success("Tạo mới size thành công");
    //     } catch (e) {
    //         errorAPI(e);
    //     }
    // }, []);

    const fHandler = useCallback(
        async (data: CreateBlogLink, id: string | undefined) => {
            try {
                if (!id) {
                    const res = await API.blog_link.create(data);
                    setBlogs((ts) => [...ts, res.data]);
                    setShowCreate(false);
                    notify.success("Tạo mới liên kết thành công");
                } else {
                    const res = await API.blog_link.edit(id, data);
                    setBlogs((ts) => {
                        const index = ts.findIndex((t) => t._id === id);
                        return [
                            ...ts.slice(0, index),
                            res.data,
                            ...ts.slice(index + 1),
                        ];
                    });
                    setShowCreate(false);
                    notify.success("Chỉnh sửa liên kết thành công");
                }
            } catch (e) {
                errorAPI(e);
            }
        },
        []
    );

    return {
        blogs,
        del,
        showCreate,
        setShowCreate,
        fHandler,
        itemEdit,
        setItemEdit,
    };
};
export default useSize;
