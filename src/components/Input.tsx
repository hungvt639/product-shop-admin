import React, { useState } from "react";

type props = {
    refValue: React.MutableRefObject<string>;
    type?: string;
    className?: string;
    name?: string;
    placeholder?: string;
    autoComplete?: string;
    // required?: boolean | string;
    // firstSubmit?: boolean;
    // defaultValue?: string
    // validate?: (data: string) => { value: boolean; message: string };
};

const Input: React.FC<props> = (props: props) => {
    const [value, setValue] = useState<string>(props.refValue.current);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        props.refValue.current = e.target.value;
    }

    return (
        <input
            className={props.className}
            type={props.type ? props.type : "text"}
            name={props.name ? props.name : ""}
            placeholder={props.placeholder ? props.placeholder : ""}
            autoComplete={props.autoComplete ? props.autoComplete : "off"}
            value={value}
            onChange={(e) => onChange(e)}
        />
    );
};
export default Input;
