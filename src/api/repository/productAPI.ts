import { AxiosResponse } from "axios";
import utils from "../../utils";
import AxiosAPI from "../config";
import { Pagination, SearchBody } from "../interface";
import { Color } from "./colorAPI";
import { Type } from "./typeAPI";

class ProductAPI {
    private resource = "apiv1/product";

    public gets = (
        obj?: SearchBody
    ): Promise<AxiosResponse<Pagination<Product>>> => {
        const str = utils.objToSearch(obj);
        return AxiosAPI(true).get(`${this.resource}${str}`);
    };

    public getProductSale = (): Promise<AxiosResponse<Pagination<Product>>> => {
        return AxiosAPI(true).get(`${this.resource}/sale`);
    };

    public getProduct = (slug: string): Promise<AxiosResponse<Product>> => {
        return AxiosAPI(true).get(`${this.resource}/${slug}`);
    };

    public createProduct = (
        data: CreateProduct
    ): Promise<AxiosResponse<Product>> => {
        return AxiosAPI(true).post(`${this.resource}`, data);
    };

    public editProduct = (
        id: string,
        data: CreateProduct
    ): Promise<AxiosResponse<Product>> => {
        return AxiosAPI(true).put(`${this.resource}/${id}`, data);
    };

    public deleteProduct = (id: string): Promise<AxiosResponse<any>> => {
        return AxiosAPI(true).delete(`${this.resource}/${id}`);
    };
}

export default new ProductAPI();

export interface Product {
    _id: string;
    name: string;
    img: string;
    img1: string;
    image: string[];
    price: number;
    sizes: string[];
    colors: Color[];
    type: Type;
    isSale: boolean;
    description: string;
    information: string;
    created_at: string;
    updated_at: string;
    slug: string;
    sold: number;
}

export class CreateProduct {
    name?: string;
    img?: string;
    img1?: string;
    image?: string[];
    price?: number;
    sizes?: string[];
    colors?: string[];
    type?: string;
    description?: string;
    information?: string;
    sold?: number;
    isSale?: boolean;
    // constructor(data: CreateProduct | null) {
    //     this.name = data?.name ?? undefined;
    //     this.img = data?.img ?? undefined;
    //     this.img1 = data?.img1 ?? undefined;
    //     this.image = data?.image ?? undefined;
    //     this.price = data?.price ?? undefined;
    //     this.sizes = data?.sizes ?? undefined;
    //     this.colors = data?.colors ?? undefined;
    //     this.type = data?.type ?? undefined;
    //     this.description = data?.description ?? undefined;
    //     this.information = data?.information ?? undefined;
    //     this.sold = data?.sold ?? undefined;
    //     this.isSale = data?.isSale ?? undefined;
    // }
    constructor(data: Product | undefined) {
        this.name = data?.name ?? undefined;
        this.img = data?.img ?? undefined;
        this.img1 = data?.img1 ?? undefined;
        this.image = data?.image ?? undefined;
        this.price = data?.price ?? undefined;
        this.sizes = data?.sizes ?? undefined;
        this.colors = data?.colors ? data.colors.map((c) => c._id) : undefined;
        this.type = data?.type ? data.type._id : undefined;
        this.description = data?.description ?? undefined;
        this.information = data?.information ?? undefined;
        this.sold = data?.sold ?? undefined;
        this.isSale = data?.isSale ?? undefined;
    }
}
