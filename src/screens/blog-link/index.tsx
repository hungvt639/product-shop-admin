import { Table } from "antd";
import { BlogLink } from "../../api/repository/blogLinkAPI";
import Confirm from "../../components/confirm";
import Modal from "../../components/modal";
import FromCreate from "./FromCreate";
import usesize from "./hook/useBlogLink";

const SizeComponent = () => {
  const { blogs, fHandler, del, setShowCreate, showCreate, itemEdit, setItemEdit } = usesize();
  const colums = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
      render: (text: string, record: BlogLink, index: number) => index,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (text: string, record: BlogLink, index: number) => <div dangerouslySetInnerHTML={{ __html: text }}></div>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,

      render: (text: string, record: BlogLink) => (
        <>
          <button
            onClick={() => {
              setItemEdit(record);
              setShowCreate(true);
            }}
            className="mr-3"
          >
            Sửa
          </button>
          <Confirm message="Bạn có chắc chắn muốn xóa" onOk={() => del(record._id)}>
            <button>Xóa</button>
          </Confirm>
        </>
      ),
    },
  ];
  return (
    <div className="p-5 overflow-auto h-full">
      <h1>Liên kết</h1>
      <div className="flex justify-end">
        <button
          onClick={() => {
            setItemEdit(undefined);
            setShowCreate(true);
          }}
          className="mb-5"
        >
          Tạo mới
        </button>
      </div>
      <Table pagination={false} columns={colums} dataSource={blogs} rowKey={(r) => r._id} />
      <Modal show={showCreate} onClose={() => setShowCreate(false)}>
        <FromCreate create={fHandler} itemEdit={itemEdit} />
      </Modal>
    </div>
  );
};
export default SizeComponent;
