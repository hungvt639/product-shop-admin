import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Image, Select } from "antd";
import React, { useState } from "react";
import { CreateProduct, Product } from "../../api/repository/productAPI";
import UploadCustom from "../../components/upload";
import _env from "../../_env";
import useColor from "../color/hook/useColor";
import useSize from "../size/hook/useSize";
import useType from "../type/hook/useType";
import "./style.scss";

const { Option } = Select;
type FromCreateProps = {
    fHandler: (data: CreateProduct, id?: string) => Promise<void>;
    itemEdit?: Product;
};
const dd =
    "<p>👉 Nếu chưa biết lựa size bạn có thể inbox để được chúng mình tư vấn.</p><p>🔹 Chính sách đổi trả Outerity Kids<br>– Miễn phí đổi hàng cho khách mua ở Outerity trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm hàng, nhầm size.<br>- Quay video mở sản phẩm khi nhận hàng, nếu không có video unbox, khi phát hiện lỗi phải báo ngay cho Outerity trong 1 ngày tính từ ngày giao hàng thành công. Qua 1 ngày chúng mình không giải quyết khi không có video unbox.<br>– Sản phẩm đổi trong thời gian 3 ngày kể từ ngày nhận hàng<br>– Sản phẩm còn mới nguyên tem, tags, sản phẩm chưa giặt và không dơ bẩn, hư hỏng bởi những tác nhân bên ngoài cửa hàng sau khi mua hàng.</p>";
const FromCreate = ({ fHandler, itemEdit }: FromCreateProps) => {
    const [value, setValue] = useState(new CreateProduct(itemEdit));
    const [imgs, setImgs] = useState("");
    const [image, setImages] = useState<string[]>(itemEdit?.image ?? []);

    const [description, setDescription] = useState<string>(
        itemEdit?.description ?? dd
    );
    const [information, setInformation] = useState<string>(
        itemEdit?.information ?? ""
    );
    const { types } = useType();
    const { colors } = useColor();
    const { sizes } = useSize();
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...value, image, description, information };
        await fHandler(data, itemEdit?._id);
        setImgs("");
        setImages([]);
        setInformation("");
        setDescription("");

        // setValue(new CreateProduct(null));
    };

    const addImgUrl = () => {
        if (imgs) {
            setImages([...image, imgs]);
            setImgs("");
        }
    };
    const removeImages = (i: number) => {
        setImages([...image.slice(0, i), ...image.slice(i + 1)]);
    };
    return (
        <form
            className="flex flex-row py-10 _form-product overflow-auto"
            onSubmit={onSubmit}
        >
            <div className="flex flex-col px-5 border-r border-solid border-gray-400 w-1/3">
                <h1 className="text-center">Tạo mới Carousel</h1>
                <div className="flex flex-row">
                    <label className="mr-5" htmlFor="name">
                        Tên:
                    </label>
                    <input
                        id="name"
                        value={value.name ?? ""}
                        onChange={(e) =>
                            setValue({ ...value, name: e.target.value })
                        }
                        placeholder="Name"
                    />
                </div>
                <div className="flex flex-row my-5">
                    <div className="flex flex-col mr-5">
                        <label className="mr-5" htmlFor="img">
                            Ảnh chính:
                        </label>
                        <input
                            id="img"
                            value={value.img ?? ""}
                            onChange={(e) =>
                                setValue({ ...value, img: e.target.value })
                            }
                            placeholder="Ảnh chính"
                        />
                        <label className="text-center mt-5">
                            Hoặc upload tại đây
                        </label>
                        <div className="flex justify-center mt-2">
                            <UploadCustom
                                className="upload-button"
                                image={value.img}
                                changeImage={(s) =>
                                    setValue({ ...value, img: s })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="mr-5" htmlFor="name">
                            Ảnh hover:
                        </label>
                        <input
                            id="img1"
                            value={value.img1 ?? ""}
                            onChange={(e) =>
                                setValue({ ...value, img1: e.target.value })
                            }
                            placeholder="Ảnh chính hover"
                        />
                        <label className="text-center mt-5">
                            Hoặc upload tại đây
                        </label>
                        <div className="flex justify-center mt-2">
                            <UploadCustom
                                className="upload-button"
                                image={value.img1}
                                changeImage={(s) =>
                                    setValue({ ...value, img1: s })
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row my-5">
                    <div className="flex flex-col mr-5 flex-1">
                        <label className="mr-5" htmlFor="type">
                            Nhóm sản phẩm
                        </label>
                        <Select
                            placeholder="Chọn nhóm"
                            id="type"
                            onChange={(val) =>
                                setValue({ ...value, type: val?.toString() })
                            }
                            value={value.type ?? ""}
                        >
                            {types.map((t) => (
                                <Option key={t._id} value={t._id}>
                                    {t.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="mr-5" htmlFor="price">
                            Giá bán
                        </label>
                        <input
                            id="price"
                            type="number"
                            value={value.price ?? ""}
                            onChange={(e) =>
                                setValue({
                                    ...value,
                                    price: parseInt(e.target.value),
                                })
                            }
                            placeholder="Giá bán"
                        />
                    </div>
                </div>
                <div className="flex flex-row my-5">
                    <div className="flex flex-col mr-5 flex-1">
                        <label className="mr-5" htmlFor="size">
                            Size
                        </label>
                        <Select
                            id="size"
                            mode="multiple"
                            placeholder="Size"
                            value={value.sizes}
                            onChange={(val) =>
                                setValue({ ...value, sizes: val as string[] })
                            }
                        >
                            {sizes.map((t) => (
                                <Option key={t._id} value={t.name}>
                                    {t.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex flex-col mr-5 flex-1">
                        <label className="mr-5" htmlFor="color">
                            Màu
                        </label>
                        <Select
                            id="color"
                            mode="multiple"
                            placeholder="Màu"
                            value={value.colors}
                            onChange={(val) =>
                                setValue({ ...value, colors: val as string[] })
                            }
                        >
                            {colors.map((t) => (
                                <Option key={t._id} value={t._id}>
                                    <span
                                        style={{
                                            backgroundColor: t.code,
                                            color: t.code.startsWith("#ffffff")
                                                ? "#888888"
                                                : "",
                                        }}
                                        className="px-3 py-1 text-white rounded border border-solid border-gray-400"
                                    >
                                        {t.name}
                                    </span>
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="flex flex-row my-5">
                    <div className="flex flex-col mr-5">
                        <div className="flex flex-row">
                            <label
                                className="mr-5 whitespace-nowrap"
                                htmlFor="imgs"
                            >
                                Ảnh
                            </label>
                            <input
                                id="imgs"
                                value={imgs}
                                onChange={(e) => setImgs(e.target.value)}
                                placeholder="Thêm url"
                            />
                            <button
                                onClick={addImgUrl}
                                type="button"
                                className="whitespace-nowrap"
                            >
                                Thêm
                            </button>
                        </div>

                        <label className="mt-5">Hoặc upload tại đây</label>
                        <div className="flex flex-wrap mt-2">
                            {image.map((img, i) => (
                                <div key={i} className="_images-detail">
                                    <div
                                        onClick={() => removeImages(i)}
                                        className="close"
                                    >
                                        X
                                    </div>
                                    <Image src={img} alt="img" key={i} />
                                </div>
                            ))}
                            <UploadCustom
                                className="upload-button"
                                image=""
                                changeImage={(s) => setImages((i) => [...i, s])}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="mt-5" type="submit">
                        {itemEdit ? "Chỉnh sửa" : "Tạo mới"}
                    </button>
                </div>
            </div>
            <div className="flex flex-col px-5 w-2/3">
                <div className="pb-10 border-b border-solid border-gray-400">
                    <label>Mô tả</label>
                    <CKEditor
                        key="description"
                        editor={ClassicEditor}
                        data={description}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription(data);
                        }}
                        config={{
                            ckfinder: {
                                uploadUrl: _env.URL_IMG_UPLOAD_CK,
                            },
                        }}
                    />
                </div>
                <div className="py-5">
                    <label>Chi tiết, thông tin về sản phẩm</label>
                    <CKEditor
                        key="information"
                        editor={ClassicEditor}
                        data={information}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setInformation(data);
                        }}
                        config={{
                            ckfinder: {
                                uploadUrl: _env.URL_IMG_UPLOAD_CK,
                            },
                        }}
                    />
                </div>
            </div>
        </form>
    );
};
export default FromCreate;
