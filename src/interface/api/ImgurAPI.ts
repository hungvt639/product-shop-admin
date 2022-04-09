import { AxiosResponse } from "axios";

export interface ResponseUploadImgur {
    data: {
        id: string;
        title: any;
        description: any;
        datetime: number;
        type: string;
        animated: boolean;
        width: number;
        height: number;
        size: number;
        views: number;
        bandwidth: number;
        vote: any;
        favorite: boolean;
        nsfw: any;
        section: any;
        account_url: any;
        account_id: number;
        is_ad: boolean;
        in_most_viral: boolean;
        has_sound: boolean;
        tags: any[];
        ad_type: number;
        ad_url: string;
        edited: string;
        in_gallery: boolean;
        deletehash: string;
        name: string;
        link: string;
    };
    success: boolean;
    status: number;
}

export default interface ImgurAPI {
    uploadImg: (data: FormData) => Promise<AxiosResponse<ResponseUploadImgur>>;
}
