import { Image, Steps } from "antd";
import { Order } from "../../api/repository/orderAPI";
import { formatDate } from "../../utils/caculator";
import useOrder from "./hook/useOrder";
import "./style.scss";

const { Step } = Steps;
const st = ["Đặt đơn", "Xác nhận", "Đang giao", "Nhận hàng"];
function getStatus(order: Order, i: number) {
    if (order.status === 4) return "error";
    if (order.status === i - 1) return "process";
    return order.status > i - 1 ? "finish" : "wait";
}

const OrderComponent = () => {
    const { orders } = useOrder();
    console.log("order", orders);

    return (
        <div className="_order p-5">
            <h1>Danh sách đơn hàng</h1>
            <div>
                {orders.map((order) => (
                    <div
                        className="flex flex-col bg-gray-100 mt-3"
                        key={order._id}
                    >
                        <div>
                            <Steps>
                                {st.map((s, i) => (
                                    <Step
                                        description={
                                            i === 0
                                                ? formatDate(order.created_at)
                                                : i === order.status
                                                ? formatDate(order.updated_at)
                                                : ""
                                        }
                                        key={i}
                                        title={s}
                                        status={getStatus(order, i)}
                                    />
                                ))}
                            </Steps>
                        </div>
                        <div className="flex flex-row">
                            <span className="mr-3">{order.fullname}</span>-
                            <span className="mx-3">{order.phone}</span>-
                            <span className="ml-3">{order.email}</span>
                        </div>
                        <div>Địa chỉ: {order.address}</div>
                        <div className="ml-10 bg-red-50">
                            {order.orderProduct.map((op) => (
                                <div
                                    key={op._id}
                                    className="flex items-center my-5"
                                >
                                    <span className="mx-5 flex-1">
                                        {op.product.name}
                                    </span>
                                    <span className="mx-5 flex-1">
                                        <Image
                                            src={op.product.img}
                                            alt="img"
                                            width={100}
                                            height={100}
                                        />
                                    </span>

                                    <span className="mx-5 flex-1">
                                        {op.size}
                                    </span>
                                    <span className="flex flex-row mx-5 flex-1">
                                        {op.color.name}
                                        <div
                                            style={{
                                                backgroundColor: op.color.code,
                                            }}
                                            className="_show-color ml-2"
                                        ></div>
                                    </span>
                                    <span className="mx-5 flex-1">
                                        {op.product.price.toLocaleString(
                                            "vi-VN"
                                        )}
                                    </span>
                                    <span className="mx-5 flex-1">
                                        {op.amount}
                                    </span>
                                    <span className="mx-5 flex-1">
                                        {(
                                            op.product.price * op.amount
                                        ).toLocaleString("vi-VN")}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default OrderComponent;
