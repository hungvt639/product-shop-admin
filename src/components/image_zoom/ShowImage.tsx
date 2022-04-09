import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";
import { MdClose } from "react-icons/md";
type ShowImageProps = {
    src: string;
    alt: string;
    show: boolean;
    onClose: () => void;
};
const ShowImage = (props: ShowImageProps) => {
    const { alt, src, show, onClose } = props;

    const [showElememt, setShowElememt] = useState<boolean>(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [bgrPosition, setBgrPosition] = useState("");
    const imgRef = useRef<HTMLImageElement>(null);
    const rectangle = { width: 50, height: 40, scale: 15 };
    const imgW = 300;

    useEffect(() => {
        if (show === true) {
            setShowElememt(true);
        } else {
            setTimeout(() => {
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

    const getBgrSize = useMemo(() => {
        return imgW * rectangle.scale + "px ";
    }, [rectangle.scale]);

    const changePosition = useCallback(
        (e: any) => {
            const offset = imgRef.current?.getBoundingClientRect();
            if (offset) {
                let top = e.clientY - offset.top - rectangle.height / 2;
                if (top + rectangle.height > offset.height)
                    top = offset.height - rectangle.height;
                if (top < 0) top = 0;

                let left = e.clientX - offset.left - rectangle.width / 2;
                if (left + rectangle.width > offset.width)
                    left = offset.width - rectangle.width;
                if (left < 0) left = 0;
                setPosition({ left: left, top: top });
                setBgrPosition(
                    "-" +
                        left * rectangle.scale +
                        "px -" +
                        top * rectangle.scale +
                        "px"
                );
            }
        },
        [rectangle.height, rectangle.scale, rectangle.width]
    );
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
                <div>
                    <div
                        onMouseMove={changePosition}
                        className="img-zoom-container"
                    >
                        <img
                            ref={imgRef}
                            src={src}
                            alt={alt}
                            width={imgW}
                        ></img>
                        <div
                            style={{
                                ...position,
                                ...rectangle,
                            }}
                            className="img-zoom-lens"
                        ></div>
                    </div>
                </div>

                <div
                    style={{
                        backgroundImage: `url('${src}')`,
                        backgroundSize: getBgrSize,
                        backgroundPosition: bgrPosition,
                        width: rectangle.width * rectangle.scale,
                        height: rectangle.height * rectangle.scale,
                    }}
                    className="img-zoom-result"
                ></div>
            </div>

            <div className="btn-action-img">
                <span onClick={onClose}>
                    <MdClose />
                </span>
            </div>
        </div>
    );
};
export default ShowImage;
