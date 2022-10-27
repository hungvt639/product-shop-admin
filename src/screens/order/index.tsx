import { Form, Pagination, Steps, Tag } from "antd";
import { Order } from "../../api/repository/orderAPI";
import { formatDate } from "../../utils/caculator";
import useOrder from "./hook/useOrder";
import { GrContactInfo, GrLocation } from "react-icons/gr";
import { GoNote } from "react-icons/go";
import "./style.scss";
import Item from "./Item";
import { Input } from "antd";
import { Fragment } from "react";
import { Select } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const { Step } = Steps;
const st = ["Đặt đơn", "Xác nhận", "Đang giao", "Nhận hàng", "Hủy đơn"];
function getStatus(order: Order, i: number) {
  if (order.status === 4) return "error";
  if (order.status === i - 1) return "process";
  return order.status > i - 1 ? "finish" : "wait";
}

function getColor(stt: number) {
  if (stt < 3) return "processing";
  if (stt === 3) return "success";
  return "error";
}

const OrderComponent = () => {
  const { orders, docs, pages, setPages, changeData, setFilter, filter } = useOrder();

  return (
    <div className="_order p-5 overflow-auto h-full">
      <h1>Danh sách đơn hàng</h1>
      <div className="flex">
        <span
          onClick={() => setFilter({ ...filter, status: "" })}
          className={`px-5 py-1 rounded cursor-pointer mr-2 border${
            filter.status === "" ? " bg-green-600 text-white" : ""
          }`}
        >
          Tất cả
        </span>
        {st.map((s, i) => (
          <span
            onClick={() => setFilter({ ...filter, status: i.toString() })}
            className={`px-5 py-1 rounded cursor-pointer mr-2 border${
              filter.status === i.toString() ? " bg-green-600 text-white" : ""
            }`}
            key={i}
          >
            {s}
          </span>
        ))}
      </div>
      <div>
        {orders.map((order, i) => (
          <div className="flex flex-col bg-gray-100 mt-3 px-5 py-3" key={order._id}>
            <div className="border-b mb-3">
              <Steps>
                {st.map((s, i) =>
                  i < st.length - 1 ? (
                    <Step
                      description={
                        i === 0 ? formatDate(order.created_at) : i === order.status ? formatDate(order.updated_at) : ""
                      }
                      key={i}
                      title={s}
                      status={getStatus(order, i)}
                    />
                  ) : (
                    <Fragment key={i} />
                  )
                )}
              </Steps>
            </div>
            <div className="flex justify-between">
              <div>
                <Tag color={getColor(order.status)}>{st[order.status]}</Tag>
              </div>
              <Form
                className="_form-status flex flex-row"
                initialValues={{ status: order.status }}
                onFinish={(values) => changeData(order._id, values, i)}
                autoComplete="off"
              >
                <Form.Item name="status">
                  <Select>
                    {st.map((s, i) => (
                      <Option value={i} key={i}>
                        {s}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <div className="flex justify-end">
                  <button>Lưu</button>
                </div>
              </Form>
            </div>
            <div className="flex flex-row items-center">
              <GrContactInfo className="text-2xl mr-5" />
              <span className="mr-3 font-bold">{order.fullname}</span>-
              <span className="mx-3 font-bold">{order.phone}</span>-<span className="ml-3">{order.email}</span>
            </div>
            <div className="flex items-center">
              <GrLocation className="text-2xl mr-5" />
              <span>{order.address}</span>
            </div>
            <div className="flex items-center">
              <GoNote className="text-2xl mr-5" />
              <span>{order.note ?? "__"}</span>
            </div>
            <div className="ml-10 bg-white">
              {order.orderProduct.map((op) => (
                <Item key={op._id} product={op} />
              ))}
              <div className="px-3">
                <div className="flex justify-end mb-2">{order.ship.toLocaleString("vi-VN")}₫</div>
                <div className="flex justify-between mb-5">
                  <span>Tổng</span>
                  <span className="font-semibold text-red-500">{order.price.toLocaleString("vi-VN")}₫</span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Form
                initialValues={{ noteAdmin: order.noteAdmin }}
                onFinish={(values) => changeData(order._id, values, i)}
                autoComplete="off"
                className="_note-admin"
              >
                <Form.Item label="Ghi chú" name="noteAdmin">
                  <TextArea />
                </Form.Item>
                <div className="flex justify-end">
                  <button>Lưu</button>
                </div>
              </Form>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Pagination
          showSizeChanger
          defaultCurrent={pages.page}
          pageSize={pages.limit}
          current={pages.page}
          total={docs?.totalDocs}
          pageSizeOptions={["5", "10", "20", "50", "100"]}
          onChange={(page, limit) => setPages({ page, limit: limit ?? 10 })}
          showTotal={(total, range) => <div>{`${range[0]}-${range[1]} of ${total} items`}</div>}
        />
      </div>
    </div>
  );
};
export default OrderComponent;
