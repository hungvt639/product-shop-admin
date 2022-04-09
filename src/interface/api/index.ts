import UserAPI from "./UserAPI";
import ImgurAPI from "./ImgurAPI";
export default interface API {
    user: UserAPI;

    imgur: ImgurAPI;
}
