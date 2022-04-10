import { Image, Switch, Table } from "antd";
import { Product } from "../../api/repository/productAPI";
import { Type } from "../../api/repository/typeAPI";
import Confirm from "../../components/confirm";
import Modal from "../../components/modal";
import From from "./From";
import useProduct from "./hook/useProduct";

const ProductComponent = () => {
    const {
        products,
        fHandler,
        del,
        itemEdit,
        setItemEdit,
        showModel,
        setShowModel,
    } = useProduct();
    const colums = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 100,
            render: (text: string, record: Product, index: number) => index,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ảnh",
            dataIndex: "img",
            key: "img",
            render: (text: string) => (
                <Image height={100} width={100} src={text} />
            ),
        },
        {
            title: "Nhóm",
            dataIndex: "type",
            key: "type",
            render: (text: Type) => text.name,
        },
        {
            title: "Giá bán",
            dataIndex: "price",
            key: "price",
            render: (text: number) => text.toLocaleString("vi-VN"),
        },
        {
            title: "Còn hàng",
            dataIndex: "isSale",
            key: "isSale",
            render: (text: boolean, record: Product) => (
                <Switch
                    defaultChecked={text}
                    onChange={() =>
                        fHandler({ isSale: !record.isSale }, record._id)
                    }
                />
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: 150,

            render: (text: string, record: Product) => (
                <>
                    <button
                        onClick={() => {
                            setItemEdit(record);
                            setShowModel(true);
                        }}
                        className="mr-3"
                    >
                        Sửa
                    </button>
                    <Confirm
                        message="Bạn có chắc chắn muốn xóa"
                        onOk={() => del(record._id)}
                    >
                        <button>Xóa</button>
                    </Confirm>
                </>
            ),
        },
    ];
    return (
        <div className="_product p-5 overflow-auto h-full">
            <h1>Danh sách sản phẩm</h1>
            <div className="flex justify-end">
                <button
                    onClick={() => {
                        setItemEdit(undefined);
                        setShowModel(true);
                    }}
                    className="mb-5"
                >
                    Tạo mới
                </button>
            </div>
            <Table
                pagination={false}
                columns={colums}
                dataSource={products}
                rowKey={(r) => r._id}
            />
            <Modal show={showModel} onClose={() => setShowModel(false)}>
                <From fHandler={fHandler} itemEdit={itemEdit} />
            </Modal>
        </div>
    );
};
export default ProductComponent;
