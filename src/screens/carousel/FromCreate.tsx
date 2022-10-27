import React, { useState } from "react";
import { CreateCarousel } from "../../api/repository/carouselAPI";
import UploadCustom from "../../components/upload";

type FromCreateProps = {
  create: (data: CreateCarousel) => Promise<void>;
};

const FromCreate = ({ create }: FromCreateProps) => {
  const [value, setValue] = useState("");
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await create(new CreateCarousel(value));
    setValue("");
  };
  return (
    <form className="flex flex-col p-10" onSubmit={onSubmit}>
      <h1 className="text-center">Tạo mới Carousel</h1>
      <label className="text-center" htmlFor="url">
        Nhập url
      </label>
      <input id="url" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Url" />

      <label className="text-center mt-5">Hoặc upload ảnh tại đây</label>
      <div className="flex justify-center mt-2">
        <UploadCustom className="upload-button" image={value} changeImage={setValue} />
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
