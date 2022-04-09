import React, { useState } from "react";
import { CreateProduct } from "../../api/repository/productAPI";
import UploadCustom from "../../components/upload";
import { Image, Select } from "antd";
import useType from "../type/hook/useType";
import useColor from "../color/hook/useColor";
import useSize from "../size/hook/useSize";
import "./style.scss";
const { Option } = Select;
type FromCreateProps = {
    create: (data: CreateProduct) => Promise<void>;
};

const FromCreate = ({ create }: FromCreateProps) => {
    const [value, setValue] = useState(new CreateProduct(null));
    const [imgs, setImgs] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const { types } = useType();
    const { colors } = useColor();
    const { sizes } = useSize();
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...value, images };
        console.log("value", data);

        // await create(value);
        // setValue(new CreateProduct(null));
    };

    const addImgUrl = () => {
        if (imgs) {
            setImages([...images, imgs]);
            setImgs("");
        }
    };
    const removeImages = (i: number) => {
        setImages([...images.slice(0, i), ...images.slice(i + 1)]);
    };
    return (
        <form className="flex flex-row p-10 _form-product" onSubmit={onSubmit}>
            <div className="flex flex-col">
                <h1 className="text-center">Tạo mới Carousel</h1>
                <div className="flex flex-row">
                    <label className="mr-5" htmlFor="name">
                        Tên:
                    </label>
                    <input
                        id="name"
                        value={value.name}
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
                            value={value.img}
                            onChange={(e) =>
                                setValue({ ...value, img: e.target.value })
                            }
                            placeholder="Ảnh chính"
                        />
                        <label className="text-center mt-5">
                            Hoặc upload ảnh tại đây
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
                            value={value.img1}
                            onChange={(e) =>
                                setValue({ ...value, img1: e.target.value })
                            }
                            placeholder="Ảnh chính hover"
                        />
                        <label className="text-center mt-5">
                            Hoặc upload ảnh tại đây
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
                            Loại sản phẩm
                        </label>
                        <Select
                            id="type"
                            onChange={(val) =>
                                setValue({ ...value, type: val?.toString() })
                            }
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
                            value={value.price}
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
                            // options={options as any}
                            onChange={(val) =>
                                setValue({ ...value, colors: val as string[] })
                            }
                        >
                            {colors.map((t) => (
                                <Option key={t._id} value={t._id}>
                                    {/* <p className="flex flex-row"> */}
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
                                    {/* <div
                                        
                                    ></div> */}
                                    {/* </p> */}
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
                                Ảnh chi tiết
                            </label>
                            <input
                                id="imgs"
                                value={imgs}
                                onChange={(e) => setImgs(e.target.value)}
                                placeholder="Ảnh chi tiết"
                            />
                            <button
                                onClick={addImgUrl}
                                type="button"
                                className="whitespace-nowrap"
                            >
                                Thêm ảnh
                            </button>
                        </div>

                        <label className="text-center mt-5">
                            Hoặc upload ảnh tại đây
                        </label>
                        <div className="flex flex-wrap mt-2">
                            {images.map((img, i) => (
                                <div className="_images-detail">
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
                        Tạo mới
                    </button>
                </div>
            </div>
        </form>
    );
};
export default FromCreate;
