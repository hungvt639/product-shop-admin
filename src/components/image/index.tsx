import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import ShowImage from "./ShowImage";
import "./style.scss";
type ImageProps = {
    className?: string;
    src: string;
    alt: string;
    width?: string | number;
    height?: string | number;
};
const Image = (props: ImageProps) => {
    const { className, alt, src, width, height } = props;
    const [show, setShow] = useState<boolean>(false);

    return (
        <div
            style={{ width: width ?? "", height: height ?? "" }}
            className={`_images ${className ?? ""}`}
        >
            <img src={src} alt={alt} />
            <div onClick={() => setShow(true)} className="preview">
                <MdRemoveRedEye style={{ marginRight: 5 }} /> Preview
            </div>
            <ShowImage
                src={src}
                alt={alt}
                show={show}
                onClose={() => setShow(false)}
            />
        </div>
    );
};
export default Image;
