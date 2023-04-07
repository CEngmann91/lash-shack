import './InputField.scss';
import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}
const InputField = ({ placeholder = 'Enter Text', ...props }: Props) => {

    return (
        <div className="input-container">
            <input {...props} placeholder={placeholder} className="input-field" />
            <label htmlFor="input-field" className="input-label">{placeholder}</label>
            <span className="input-highlight"></span>
        </div>
    )
}

export default InputField