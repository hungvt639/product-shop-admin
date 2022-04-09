import { AxiosResponse } from "axios";
import AxiosAPI from "../config";

class TypeAPI {
    private resource = "apiv1/type";

    public getTypes = (): Promise<AxiosResponse<Type[]>> => {
        return AxiosAPI(true).get(`${this.resource}`);
    };

    public createType = (data: CreateType): Promise<AxiosResponse<Type>> => {
        return AxiosAPI(true).post(`${this.resource}`, data);
    };

    public editType = (
        id: string,
        data: CreateType
    ): Promise<AxiosResponse<Type>> => {
        return AxiosAPI(true).put(`${this.resource}/${id}`, data);
    };

    public deleteType = (id: string): Promise<AxiosResponse<any>> => {
        return AxiosAPI(true).delete(`${this.resource}/${id}`);
    };
}

export default new TypeAPI();

export interface Type {
    _id: string;
    name: string;
    code: string;
}

export class CreateType {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
