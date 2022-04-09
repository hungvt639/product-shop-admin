import React, { useState } from "react";
import { CreateType } from "../../api/repository/typeAPI";

type FromCreateProps = {
    create: (data: CreateType) => Promise<void>;
};

const FromCreate = ({ create }: FromCreateProps) => {
    const [value, setValue] = useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await create(new CreateType(value));
        setValue("");
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="text-center">Tạo mới loại sản phẩm</h1>
            <label>Tên</label>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Name"
            />
            <div className="flex justify-end">
                <button className="mt-5" type="submit">
                    Tạo mới
                </button>
            </div>
        </form>
    );
};
export default FromCreate;
