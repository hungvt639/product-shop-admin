import React, { useState } from "react";
import { ColorResult, RGBColor, SketchPicker } from "react-color";
import { Color, CreateColor } from "../../api/repository/colorAPI";
import { hexToRgb, rgbToHex } from "../../utils/caculator";

type FormEditProps = {
    itemEdit?: Color;
    edit: (id: string, data: CreateColor) => Promise<void>;
};

const FormEdit = ({ itemEdit, edit }: FormEditProps) => {
    const [value, setValue] = useState(itemEdit?.name ?? "");
    const [color, setColor] = useState<RGBColor>(
        hexToRgb(itemEdit?.code ?? "")
    );
    console.log("d", color);

    // const onSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     await create(new CreateColor(value, rgbToHex(color)));
    //     setValue("");
    //     setColor(defauColor);
    // };
    const onChangeColor = (c: ColorResult) => {
        setColor(c.rgb);
    };
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (itemEdit)
            edit(itemEdit?._id, new CreateColor(value, rgbToHex(color)));
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="text-center">Chỉnh sửa màu sắc</h1>
            <div className="flex flex-row mb-5">
                <label className="mr-5" htmlFor="name">
                    Tên
                </label>
                <input
                    id="name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Name"
                />
            </div>
            <div>
                <label>Màu sắc</label>
                <div className="flex justify-center">
                    <SketchPicker
                        color={color}
                        onChange={onChangeColor}
                        // onChangeComplete={onChangeColor}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button className="mt-5" type="submit">
                    Chỉnh sửa
                </button>
            </div>
        </form>
    );
};
export default FormEdit;
