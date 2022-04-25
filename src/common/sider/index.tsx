import { Link } from "react-router-dom";
import route from "../../router/route";
import "./slide.scss";

const Slider = () => {
    const siders = [
        {
            name: "HOME",
            content: [
                {
                    icon: "",
                    name: "Trang chủ",
                    to: route.HOME,
                },
                {
                    icon: "",
                    name: "Carousel",
                    to: route.CAROUSEL,
                },
            ],
        },
        {
            name: "PRODUCT",
            content: [
                {
                    icon: "",
                    name: "Sản phẩm",
                    to: route.PRODUCT,
                },
                {
                    icon: "",
                    name: "Nhóm sản phẩm",
                    to: route.TYPE,
                },
                {
                    icon: "",
                    name: "Màu",
                    to: route.COLOR,
                },
                {
                    icon: "",
                    name: "Size",
                    to: route.SIZE,
                },
            ],
        },
        {
            name: "ORDER",
            content: [
                {
                    icon: "",
                    name: "Đơn hàng",
                    to: route.ORDER,
                },
            ],
        },
    ];
    return (
        <div className="slider">
            <div className="w-full px-5 py-2">Uyn Shop</div>
            {siders.map((sider, index) => (
                <div key={index} className="px-5">
                    <h3 className="my-0">{sider.name}</h3>
                    <ul className="ml-3">
                        {sider.content.map((c, i) => (
                            <li key={i}>{<Link to={c.to}>{c.name}</Link>}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default Slider;
