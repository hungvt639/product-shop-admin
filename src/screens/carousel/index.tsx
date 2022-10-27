import useCarousel from "./hook/useCarousel";
import { Image, Table } from "antd";
import Confirm from "../../components/confirm";
import Modal from "../../components/modal";
import FormEdit from "./FromEdit";
import FromCreate from "./FromCreate";
import { Carousel } from "../../api/repository/carouselAPI";
import "./style.scss";
const CarouselComponent = () => {
  const { carousels, del, showEdit, setShowEdit, itemEdit, setItemEdit, edit, showCreate, setShowCreate, create } =
    useCarousel();
  const colums = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
      render: (text: string, record: Carousel, index: number) => index,
    },
    {
      title: "Url",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: string) => <Image height={100} src={text} />,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 150,

      render: (text: string, record: Carousel) => (
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
          <Confirm message="Bạn có chắc chắn muốn xóa" onOk={() => del(record._id)}>
            <button>Xóa</button>
          </Confirm>
        </>
      ),
    },
  ];

  return (
    <div className="_carousel p-5 overflow-auto h-full">
      <h1>Loại sản phẩm</h1>
      <div className="flex justify-end">
        <button onClick={() => setShowCreate(true)} className="mb-5">
          Tạo mới
        </button>
      </div>
      <Table pagination={false} columns={colums} dataSource={carousels} rowKey={(r) => r._id} />
      <Modal show={showEdit} onClose={() => setShowEdit(false)}>
        <FormEdit itemEdit={itemEdit} edit={edit} />
      </Modal>
      <Modal show={showCreate} onClose={() => setShowCreate(false)}>
        <FromCreate create={create} />
      </Modal>
    </div>
  );
};
export default CarouselComponent;
