import React, { useState } from "react";
import { CreateColor } from "../../api/repository/colorAPI";
import { SketchPicker, ColorResult, RGBColor } from "react-color";
import { rgbToHex } from "../../utils/caculator";

type FromCreateProps = {
  create: (data: CreateColor) => Promise<void>;
};

const FromCreate = ({ create }: FromCreateProps) => {
  const defauColor = { r: 255, g: 0, b: 0, a: 1 };
  const [value, setValue] = useState("");
  const [color, setColor] = useState<RGBColor>(defauColor);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await create(new CreateColor(value, rgbToHex(color)));
    setValue("");
    setColor(defauColor);
  };
  const onChangeColor = (c: ColorResult) => {
    setColor(c.rgb);
  };
  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-center">Tạo mới màu sắc mặc định</h1>
      <div className="flex flex-row mb-5">
        <label className="mr-5" htmlFor="name">
          Tên
        </label>
        <input id="name" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Name" />
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
          Tạo mới
        </button>
      </div>
    </form>
  );
};
export default FromCreate;
