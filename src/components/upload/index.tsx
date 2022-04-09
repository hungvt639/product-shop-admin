import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useState } from "react";
import _env from "../../_env";
import notify from "../notify";
import "./style.scss";

function beforeUpload(file: File) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        notify.error("You can only upload JPG/PNG file!");
    }

    return isJpgOrPng;
}

type UploadCustomProps = {
    image?: string;
    className?: string;
    changeImage: (s: string) => void;
};

const UploadCustom = ({ image, className, changeImage }: UploadCustomProps) => {
    const [loading, setLoading] = useState(false);

    const handleChange = (info: any) => {
        if (info.file.status === "error") {
            notify.error(
                info.file.response?.message ??
                    "Đã có lỗi sảy ra, bạn vui lòng thử lại sau"
            );
            setLoading(false);
            return;
        }
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            changeImage(info.file.response.link);
            setLoading(false);
        }
    };

    return (
        <Upload
            disabled={loading}
            id="upload"
            name="image"
            listType="picture"
            className={`_upload-custom ${className ?? ""}`}
            showUploadList={false}
            action={_env.URL_IMG_UPLOAD}
            headers={{
                Authorization: "Bearer " + localStorage.getItem("token"),
            }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            <div className="upload">
                {image ? (
                    <img src={image} alt="+" />
                ) : (
                    <div className="btn-upload">
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
            </div>
        </Upload>
    );
};
export default UploadCustom;
