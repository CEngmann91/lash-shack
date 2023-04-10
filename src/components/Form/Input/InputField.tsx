import './InputField.scss';
import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    placeholder: string;
}
const InputField = ({ className, placeholder = 'Enter Text', ...props }: Props) => {

    return (
        <div className={`input-container ${className}`}>
            <input {...props} placeholder={placeholder} className="input-field" />
            <label htmlFor="input-field" className="input-label">{placeholder}</label>
            <span className="input-highlight"></span>
        </div>
    )
}

export default InputField