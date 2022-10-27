import React, { useState } from "react";
import { CreateType, Type } from "../../api/repository/typeAPI";

type FormEditProps = {
  itemEdit?: Type;
  edit: (id: string, data: CreateType) => Promise<void>;
};

const FormEdit = ({ itemEdit, edit }: FormEditProps) => {
  const [value, setValue] = useState(itemEdit?.name ?? "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemEdit) edit(itemEdit?._id, new CreateType(value));
  };
  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-center">Chỉnh sửa loại sản phẩm</h1>

      <label>Tên</label>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Name" />
      <div className="flex justify-end">
        <button className="mt-5" type="submit">
          Sửa
        </button>
      </div>
    </form>
  );
};
export default FormEdit;
