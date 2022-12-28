import './Input.scss';
import React, { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from 'react';

// Todo: ref prop does not work!
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    // icon?: React.ReactNode;
    className?: string;
    ref: React.RefObject<HTMLInputElement>;
    // ref?: React.ForwardedRef<HTMLInputElement>;
}
const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ placeholder, className, ref, ...props }) => {
    
    return (
        <div className='input-container'>
            <input {...props} ref={ref} type={props.type} />
            <label>{placeholder}</label>
            {/* {icon && <span className='input-container--icon'>{icon}</span>} */}
        </div>
    );
};

export default forwardRef(Input);