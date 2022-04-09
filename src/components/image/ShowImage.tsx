import { useCallback, useEffect, useState } from "react";
import "./style.scss";
import {
    MdRotateLeft,
    MdRotateRight,
    MdZoomIn,
    MdZoomOut,
    MdClose,
} from "react-icons/md";
type ShowImageProps = {
    src: string;
    alt: string;
    show: boolean;
    onClose: () => void;
};
const ShowImage = (props: ShowImageProps) => {
    const { alt, src, show, onClose } = props;

    const [showElememt, setShowElememt] = useState<boolean>(false);
    const [scale, setScale] = useState<number>(0);
    const [rotate, setRotate] = useState<number>(0);

    const scales = [1, 1.2, 1.5, 2, 3, 5];

    const setDataScale = useCallback(
        (i: number) => {
            if (scale + i < 0 || scale + i >= scales.length) return;
            setScale(scale + i);
        },
        [scale, scales.length]
    );

    useEffect(() => {
        if (show === true) {
            setShowElememt(true);
        } else {
            setTimeout(() => {
                setScale(0);
                setRotate(0);
                setShowElememt(false);
            }, 200);
        }
    }, [show]);

    const escFunction = useCallback(
        (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    if (!showElememt) return <></>;

    return (
        <div
            className={
                show
                    ? "modal-img modal-img-view"
                    : "modal-img modal-img-not-view"
            }
        >
            <div onClick={onClose} className="close-modal-img"></div>
            <div className="show-modal-img">
                <img
                    style={{
                        transform: `rotate(${rotate}deg) scale(${scales[scale]},${scales[scale]})`,
                    }}
                    src={src}
                    alt={alt}
                />
            </div>
            <div className="btn-action-img">
                <span onClick={() => setRotate(rotate - 90)}>
                    <MdRotateLeft />
                </span>
                <span onClick={() => setRotate(rotate + 90)}>
                    <MdRotateRight />
                </span>
                <span
                    onClick={() => setDataScale(-1)}
                    className={scale === 0 ? "btn-action-img-disable" : ""}
                >
                    <MdZoomIn />
                </span>
                <span
                    onClick={() => setDataScale(+1)}
                    className={
                        scale === scales.length - 1
                            ? "btn-action-img-disable"
                            : ""
                    }
                >
                    <MdZoomOut />
                </span>
                <span onClick={onClose}>
                    <MdClose />
                </span>
            </div>
        </div>
    );
};
export default ShowImage;
