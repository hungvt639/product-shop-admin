import useColor from "./hook/useColor";
import { Table } from "antd";
import { Type } from "../../api/repository/typeAPI";
import Confirm from "../../components/confirm";
import Modal from "../../components/modal";
import FormEdit from "./FromEdit";
import FromCreate from "./FromCreate";
import "./style.scss";
const ColorComponent = () => {
    const {
        colors,
        del,
        showEdit,
        setShowEdit,
        itemEdit,
        setItemEdit,
        edit,
        showCreate,
        setShowCreate,
        create,
    } = useColor();

    const colums = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 100,
            render: (text: string, record: Type, index: number) => index,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Màu sắc",
            dataIndex: "code",
            key: "code-show",
            render: (text: string) => (
                <div
                    style={{ backgroundColor: text }}
                    className="show-color"
                ></div>
            ),
        },
        {
            title: "Mã màu",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: 150,

            render: (text: string, record: Type) => (
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
        <div className="_color p-5 overflow-auto h-full">
            <h1>Loại sản phẩm</h1>
            <div className="flex justify-end">
                <button onClick={() => setShowCreate(true)} className="mb-5">
                    Tạo mới
                </button>
            </div>
            <Table
                pagination={false}
                columns={colums}
                dataSource={colors}
                rowKey={(r) => r._id}
            />
            <Modal show={showEdit} onClose={() => setShowEdit(false)}>
                <FormEdit itemEdit={itemEdit} edit={edit} />
            </Modal>
            <Modal show={showCreate} onClose={() => setShowCreate(false)}>
                <FromCreate create={create} />
            </Modal>
        </div>
    );
};
export default ColorComponent;
