import './UploadInput.scss';
import React from 'react';

type UploadInputProps = {
    className?: string;
    value?: string | number | readonly string[] | undefined;
    // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    children: React.ReactNode;
    disabled?: boolean;
    accept?: string;
}
const UploadInput = ({ className, children, value, onChange, disabled, accept }: UploadInputProps) => (
    
    <label htmlFor="file" className={`picker ${className}`}>
        <input
            type="file"
            id="file"
            value={value}
            accept={accept}
            disabled={disabled}
            style={{ display: 'none' }}
            // multiple
            onChange={disabled ? undefined : onChange}
        />
        {children}
    </label>
);

export default UploadInput