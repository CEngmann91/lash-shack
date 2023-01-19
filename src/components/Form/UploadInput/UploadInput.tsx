import './UploadInput.scss';
import React from 'react';

type UploadInputProps = {
    className?: string;
    value?: string | number | readonly string[] | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
    disabled?: boolean;
    accept?: string;
}
const UploadInput = ({ className, children, value, onChange, disabled, accept }: UploadInputProps) => {

    return (
        <label htmlFor="file" className={`picker ${className}`}>
            <input
                value={value}
                accept={accept}
                disabled={disabled}
                style={{ display: 'none' }}
                id="file"
                multiple
                type="file"
                onChange={disabled ? () => { } : onChange}
            />
            {children}
        </label>


        // <label htmlFor="contained-button-file" className="m-0 w-100">
        //     <input
        // value={value}
        // accept={accept}
        // disabled={disabled}
        // style={{ display: 'none' }}
        // id="contained-button-file"
        // className={`picker ${className}`}
        // multiple
        // type="file"
        // onChange={disabled ? () => { } : onChange}
        //     />
        //     {children}
        // </label>
    );
};

export default UploadInput