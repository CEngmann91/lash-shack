import './InputField.scss';
import { InputHTMLAttributes, useId } from 'react'

type InputProps = React.DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
interface Props extends InputProps {
    className?: string;
    placeholder: string;
}
const InputField = ({ className, placeholder = 'Enter Text', ...props }: Props) => {
    const id = useId();

    return (
        <div className={`input-container ${className}`}>
            <input {...props} id={id} placeholder={placeholder} className="input-field" />
            <label htmlFor={id} className="input-label">{placeholder}</label>
            <span className="input-highlight"></span>
        </div>
    )
}

export default InputField