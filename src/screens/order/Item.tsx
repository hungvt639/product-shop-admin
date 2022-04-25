import { OrrderProduct } from "../../api/repository/orderAPI";

type ItemProps = {
    product: OrrderProduct;
};

const Item = (props: ItemProps) => {
    const { product } = props;
    return (
        <div className="mt-5 pb-5 border-b border-dotted relative px-3">
            <div className="flex">
                <div>
                    <div className="w-20 h-20">
                        <img src={product.product.img} alt="img" />
                    </div>
                </div>

                <div className="ml-5 w-full">
                    <h2 className="text-base font-bold pr-5">
                        {product.product.name}
                    </h2>

                    <div className="flex text-zinc-500 my-1 items-center">
                        <span className="mr-2">{product.size}</span>/
                        <span className="mx-2">{product.color.name}</span>
                        <div className="w-4 h-4 overflow-hidden cursor-pointer">
                            <p
                                className="w-full h-full"
                                style={{
                                    backgroundColor: product.color.code,
                                }}
                            ></p>
                        </div>
                    </div>
                    <div className="flex justify-between items-end mt-1">
                        <div className="px-2 text-sm bg-gray-500 rounded-sm text-white">
                            {product.amount}
                        </div>
                        <span className="text-sm">
                            x{product.product.price.toLocaleString("vi-VN")}
                            ₫/1
                        </span>
                        <span className="text-base font-semibold text-red-500">
                            {(
                                product.product.price * product.amount
                            ).toLocaleString("vi-VN")}
                            ₫
                        </span>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Item;
