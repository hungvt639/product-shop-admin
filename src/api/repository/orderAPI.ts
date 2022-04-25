import { AxiosResponse } from "axios";
import utils from "../../utils";
import AxiosAPI from "../config";
import { Pagination, SearchBody } from "../interface";

class OrderAPI {
    private resource = "apiv1/order";

    public gets = (
        obj?: SearchBody
    ): Promise<AxiosResponse<Pagination<Order>>> => {
        const str = utils.objToSearch(obj);
        return AxiosAPI(true).get(`${this.resource}${str}`);
    };

    public create = (data: CreateOrder): Promise<AxiosResponse<Order>> => {
        return AxiosAPI(true).post(`${this.resource}`, data);
    };

    public edit = (
        id: string,
        data: CreateOrder
    ): Promise<AxiosResponse<Order>> => {
        return AxiosAPI(true).put(`${this.resource}/${id}`, data);
    };

    public del = (id: string): Promise<AxiosResponse<any>> => {
        return AxiosAPI(true).delete(`${this.resource}/${id}`);
    };
}

export default new OrderAPI();

export interface Order {
    _id: string;
    fullname: string;
    phone: string;
    email: string;
    address: string;
    status: number;
    price: number;
    orderProduct: OrrderProduct[];
    ship: number;
    note: string;
    noteAdmin: string;
    created_at: string;
    updated_at: string;
}

export interface OrrderProduct {
    product: {
        name: string;
        slug: string;
        img: string;
        img1: string;
        price: number;
        type: string;
        _id: string;
    };
    amount: number;
    size: string;
    color: {
        name: string;
        code: string;
        _id: string;
    };
    _id: string;
}

export class CreateOrder {
    image: string;
    constructor(image: string) {
        this.image = image;
    }
}
