import { useCallback, useEffect, useState } from "react";
import "./style.scss";
type propsModal = {
    children: JSX.Element;
    message: string;
    onOk: () => void;
    onClose?: () => void;
};

const Confirm = (props: propsModal) => {
    const { children, message, onOk, onClose } = props;

    const [classShowConfirm, setClassShowConfirm] = useState("show-confirm");

    function show(e: any) {
        document.body.addEventListener("click", close, false);

        e.stopPropagation();
        if (classShowConfirm === "show-confirm show")
            setClassShowConfirm("show-confirm not-show");
        else setClassShowConfirm("show-confirm show");
    }

    const close = useCallback(
        (e: any) => {
            document.body.removeEventListener("click", close, false);
            setClassShowConfirm("show-confirm not-show");
            if (onClose) {
                onClose();
            }
        },
        [onClose]
    );

    function ok() {
        document.body.removeEventListener("click", close, false);

        setClassShowConfirm("show-confirm not-show");
        onOk();
    }
    function defaultF(e: any) {
        e.stopPropagation();
    }
    useEffect(() => {
        return () => {
            document.body.removeEventListener("click", close, false);
        };
    }, [close]);
    return (
        <div className="_confirm">
            <div onClick={show} className="children">
                {children}
            </div>
            <div onClick={defaultF} className={classShowConfirm}>
                <div className="show-confirm-content">
                    <div>{message}</div>
                    <div className="btn">
                        <button className="no" onClick={close}>
                            No
                        </button>
                        <button className="yes" onClick={ok}>
                            Yes
                        </button>
                    </div>
                </div>
                <div className="show-confirm-footer">
                    <div className="arrow-down"></div>
                </div>
            </div>
        </div>
    );
};
export default Confirm;
