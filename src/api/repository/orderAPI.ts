import { AxiosResponse } from "axios";
import AxiosAPI from "../config";

class OrderAPI {
    private resource = "apiv1/order";

    public get = (): Promise<AxiosResponse<Order[]>> => {
        return AxiosAPI(true).get(`${this.resource}`);
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
    orderProduct: [
        {
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
    ];
    ship: number;
    note: string;
    noteAdmin: string;
    created_at: string;
    updated_at: string;
}

export class CreateOrder {
    image: string;
    constructor(image: string) {
        this.image = image;
    }
}
