import { Link } from "react-router-dom";
import route from "../../router/route";
import "./slide.scss";
type SiderProps = {
  pathname: string;
};
const Slider = ({ pathname }: SiderProps) => {
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
    {
      name: "OTHERS",
      content: [
        {
          icon: "",
          name: "Liên kết",
          to: route.BLOG_LINK,
        },
      ],
    },
  ];
  return (
    <div className="slider border-r">
      <div className="w-full px-5 py-2">SHOP</div>
      {siders.map((sider, index) => (
        <div key={index} className="px-5">
          <h3 className="my-0 font-bold text-xl text-black">{sider.name}</h3>
          <ul className="">
            {sider.content.map((c, i) => (
              <Link key={i} className="" to={c.to}>
                <li
                  className={`text-white hover:text-black bg-gray-400 hover:bg-gray-200 rounded mb-2 px-3 py-1${
                    pathname === c.to ? " bg-green-900" : ""
                  }`}
                >
                  {c.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default Slider;
