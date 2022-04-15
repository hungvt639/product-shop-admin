import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import _env from "../../_env";
import Image from "../../components/image";
import useAvatar from "./hook/useAvatar";
import { UserInterface } from "../../api/repository/userAPI";
type propsAvatar = {
    user?: UserInterface;
};
const Avatar = (props: propsAvatar) => {
    const { user } = props;
    const { loading, beforeUpload, changeAvatar, token } = useAvatar(user);

    return (
        <div className="avatar">
            <div className="avatar-img">
                <Image
                    width="100%"
                    height="100%"
                    alt="avatar"
                    className="avatar-image"
                    src={user?.avatar ?? ""}
                />
                <ImgCrop>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className={loading ? "change-avatar" : "change-avatar"}
                        showUploadList={false}
                        action={_env.URL_IMG_UPLOAD}
                        beforeUpload={beforeUpload}
                        headers={{
                            Authorization: "Bearer " + token,
                        }}
                        onChange={changeAvatar}
                    >
                        {/* {loading ? (
                                <span className="avatar-uploader-button_loading">
                                    <LoadingOutlined />
                                </span>
                            ) : (
                                <span className="avatar-uploader-button">
                                    Thay đổi
                                </span>
                            )} */}
                        <ChangeCircleOutlinedIcon />
                    </Upload>
                </ImgCrop>
            </div>
            <p className="fullname">{user?.fullname}</p>
        </div>
    );
};
export default Avatar;
