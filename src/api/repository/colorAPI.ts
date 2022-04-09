import { AxiosResponse } from "axios";
import AxiosAPI from "../config";

class ColorAPI {
    private resource = "apiv1/color";

    public getColor = (): Promise<AxiosResponse<Color[]>> => {
        return AxiosAPI(true).get(`${this.resource}`);
    };

    public createColor = (data: CreateColor): Promise<AxiosResponse<Color>> => {
        return AxiosAPI(true).post(`${this.resource}`, data);
    };

    public editColor = (
        id: string,
        data: CreateColor
    ): Promise<AxiosResponse<Color>> => {
        return AxiosAPI(true).put(`${this.resource}/${id}`, data);
    };

    public deleteColor = (id: string): Promise<AxiosResponse<any>> => {
        return AxiosAPI(true).delete(`${this.resource}/${id}`);
    };
}

export default new ColorAPI();

export interface Color {
    _id: string;
    name: string;
    code: string;
}

export class CreateColor {
    name: string;
    code: string;
    constructor(name: string, code: string) {
        this.name = name;
        this.code = code;
    }
}
