import './TextArea.scss';
import React, { InputHTMLAttributes, TextareaHTMLAttributes, useId } from 'react'

type TextAreaProps = React.DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>;
interface Props extends TextAreaProps {
    className?: string;
    placeholder: string;
}
const TextArea = ({ className, placeholder = 'Enter Message', ...props }: Props) => {
    const id = useId();

    return (
        <div className={`textarea-container ${className}`}>
            <textarea {...props} id={id} placeholder={placeholder} className="textarea" />
            <label htmlFor={id} className="textarea-label">{placeholder}</label>
            <span className="textarea-highlight"></span>
        </div>
    )
}

export default TextArea