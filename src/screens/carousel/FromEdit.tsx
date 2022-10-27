import React, { useState } from "react";
import { CreateCarousel, Carousel } from "../../api/repository/carouselAPI";
import UploadCustom from "../../components/upload";

type FormEditProps = {
  itemEdit?: Carousel;
  edit: (id: string, data: CreateCarousel) => Promise<void>;
};

const FormEdit = ({ itemEdit, edit }: FormEditProps) => {
  const [value, setValue] = useState(itemEdit?.image ?? "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemEdit) edit(itemEdit?._id, new CreateCarousel(value));
  };
  return (
    <form className="flex flex-col p-10" onSubmit={onSubmit}>
      <h1 className="text-center">Chỉnh Carousel sản phẩm</h1>

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
          Sửa
        </button>
      </div>
    </form>
  );
};
export default FormEdit;
