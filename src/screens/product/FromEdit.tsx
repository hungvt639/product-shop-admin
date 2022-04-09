import React, { useState } from "react";
import { CreateProduct, Product } from "../../api/repository/productAPI";
import UploadCustom from "../../components/upload";

type FormEditProps = {
    itemEdit: Product;
    edit: (id: string, data: CreateProduct) => Promise<void>;
};

const FormEdit = ({ itemEdit, edit }: FormEditProps) => {
    const {
        colors,
        description,
        image,
        img,
        img1,
        information,
        isSale,
        name,
        price,
        sizes,
        type,
        sold,
    } = itemEdit;
    const [value, setValue] = useState<CreateProduct>(
        new CreateProduct({
            colors: colors.map((c) => c._id),
            description,
            image,
            img,
            img1,
            information,
            name,
            price,
            sold,
            type: type._id,
            sizes,
            isSale,
        })
    );

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (itemEdit) edit(itemEdit?._id, value);
    };
    return (
        <form className="flex flex-col p-10" onSubmit={onSubmit}>
            <h1 className="text-center">Chỉnh Carousel sản phẩm</h1>

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
            <div className="flex justify-end">
                <button className="mt-5" type="submit">
                    Sửa
                </button>
            </div>
        </form>
    );
};
export default FormEdit;
