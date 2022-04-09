import { AxiosResponse } from "axios";
import AxiosAPI from "../config";

class SizeAPI {
    private resource = "apiv1/size";

    public getSizes = (): Promise<AxiosResponse<Size[]>> => {
        return AxiosAPI(true).get(`${this.resource}`);
    };

    public createSize = (data: CreateSize): Promise<AxiosResponse<Size>> => {
        return AxiosAPI(true).post(`${this.resource}`, data);
    };

    public deleteSize = (id: string): Promise<AxiosResponse<any>> => {
        return AxiosAPI(true).delete(`${this.resource}/${id}`);
    };
}

export default new SizeAPI();

export interface Size {
    _id: string;
    name: string;
}

export class CreateSize {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
