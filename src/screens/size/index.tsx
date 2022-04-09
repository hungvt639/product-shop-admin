import { Table } from "antd";
import { Size } from "../../api/repository/sizeAPI";
import Confirm from "../../components/confirm";
import Modal from "../../components/modal";
import FromCreate from "./FromCreate";
import usesize from "./hook/useSize";

const SizeComponent = () => {
    const { sizes, create, del, setShowCreate, showCreate } = usesize();
    const colums = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 100,
            render: (text: string, record: Size, index: number) => index,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: 100,

            render: (text: string, record: Size) => (
                <Confirm
                    message="Bạn có chắc chắn muốn xóa"
                    onOk={() => del(record._id)}
                >
                    <button>Xóa</button>
                </Confirm>
            ),
        },
    ];
    return (
        <div className="p-5 overflow-auto h-full">
            <h1>Size</h1>
            <div className="flex justify-end">
                <button onClick={() => setShowCreate(true)} className="mb-5">
                    Tạo mới
                </button>
            </div>
            <Table
                pagination={false}
                columns={colums}
                dataSource={sizes}
                rowKey={(r) => r._id}
            />
            <Modal show={showCreate} onClose={() => setShowCreate(false)}>
                <FromCreate create={create} />
            </Modal>
        </div>
    );
};
export default SizeComponent;
