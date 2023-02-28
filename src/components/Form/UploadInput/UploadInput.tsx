import './UploadInput.scss';
import { ChangeEventHandler, ReactNode } from 'react';

type UploadInputProps = {
    className?: string;
    value?: string | number | readonly string[] | undefined;
    // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    children: ReactNode;
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