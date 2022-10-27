import React, { useState } from "react";
import { CreateSize } from "../../api/repository/sizeAPI";

type FromCreateProps = {
  create: (data: CreateSize) => Promise<void>;
};

const FromCreate = ({ create }: FromCreateProps) => {
  const [value, setValue] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await create(new CreateSize(value));
    setValue("");
  };
  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-center"> Tạo mới Size</h1>
      <label>Tên</label>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Name" />
      <div className="flex justify-end">
        <button className="mt-5" type="submit">
          Tạo mới
        </button>
      </div>
    </form>
  );
};
export default FromCreate;
