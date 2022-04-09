import { Image, Switch, Table } from "antd";
import { Product } from "../../api/repository/productAPI";
import Confirm from "../../components/confirm";
import Modal from "../../components/modal";
import FromCreate from "./FromCreate";
import FormEdit from "./FromEdit";
import useProduct from "./hook/useProduct";

const ProductComponent = () => {
    const {
        products,
        create,
        del,
        edit,
        itemEdit,
        setItemEdit,
        setShowCreate,
        setShowEdit,
        showCreate,
        showEdit,
    } = useProduct();
    console.log("p", products);
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
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text: string) => <Image height={100} src={text} />,
        },
        {
            title: "Giá bán",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Đăng bán",
            dataIndex: "isSale",
            key: "isSale",
            render: (text: boolean, record: Product) => (
                <Switch
                    defaultChecked={text}
                    onChange={() =>
                        edit(record._id, { isSale: !record.isSale })
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
                            setShowEdit(true);
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
        <div className="_carousel p-5 overflow-auto h-full">
            <h1>Danh sách sản phẩm</h1>
            <div className="flex justify-end">
                <button onClick={() => setShowCreate(true)} className="mb-5">
                    Tạo mới
                </button>
            </div>
            <Table
                pagination={false}
                columns={colums}
                dataSource={products}
                rowKey={(r) => r._id}
            />
            <Modal show={showEdit} onClose={() => setShowEdit(false)}>
                {itemEdit && <FormEdit itemEdit={itemEdit} edit={edit} />}
            </Modal>
            <Modal show={showCreate} onClose={() => setShowCreate(false)}>
                <FromCreate create={create} />
            </Modal>
        </div>
    );
};
export default ProductComponent;
