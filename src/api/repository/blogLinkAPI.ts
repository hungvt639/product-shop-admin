import { AxiosResponse } from "axios";
import utils from "../../utils";
import AxiosAPI from "../config";
import { SearchBody } from "../interface";

class BlogLinkAPI {
    private resource = "apiv1/blog-link";

    public gets = (obj?: SearchBody): Promise<AxiosResponse<BlogLink[]>> => {
        const str = utils.objToSearch(obj);
        return AxiosAPI(true).get(`${this.resource}${str}`);
    };
    public get = (slug: string): Promise<AxiosResponse<BlogLink>> => {
        return AxiosAPI(true).get(`${this.resource}/${slug}`);
    };

    //admin

    public create = (
        data: CreateBlogLink
    ): Promise<AxiosResponse<BlogLink>> => {
        return AxiosAPI(true).post(`${this.resource}`, data);
    };
    public edit = (
        id: string,
        data: CreateBlogLink
    ): Promise<AxiosResponse<BlogLink>> => {
        return AxiosAPI(true).put(`${this.resource}/${id}`, data);
    };

    public del = (id: string): Promise<AxiosResponse<any>> => {
        return AxiosAPI(true).delete(`${this.resource}/${id}`);
    };
}

export default new BlogLinkAPI();

export interface BlogLink {
    name: string;
    content: string;
    _id: string;
    created_at: string;
    updated_at: string;
    slug: string;
}

//admin
export class CreateBlogLink {
    name: string;
    content: string;
    constructor(name: string, content: string) {
        this.name = name;
        this.content = content;
    }
}
