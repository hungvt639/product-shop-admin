import productAPI from "./repository/productAPI";
import sizeAPI from "./repository/sizeAPI";
import typeAPI from "./repository/typeAPI";
import userAPI from "./repository/userAPI";
import fileAPI from "./repository/fileAPI";
import colorAPI from "./repository/colorAPI";
import carouselAPI from "./repository/carouselAPI";
import orderAPI from "./repository/orderAPI";

const API = {
    user: userAPI,
    product: productAPI,
    type: typeAPI,
    size: sizeAPI,
    file: fileAPI,
    color: colorAPI,
    carousel: carouselAPI,
    order: orderAPI,
};

export default API;
