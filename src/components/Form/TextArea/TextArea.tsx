import './TextArea.scss';
import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react';

// Todo: ref prop does not work!

type InputProps = InputHTMLAttributes<HTMLTextAreaElement> & {
// interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    placeholder: string;
    icon?: string;
    className?: string;
    ref: React.RefObject<HTMLTextAreaElement>;
}
const TextArea: ForwardRefRenderFunction<HTMLTextAreaElement, InputProps> = ({ placeholder, icon, className, ref, ...props }) => {
    
    return (
        <div className='inputarea-container'>
            <textarea {...props} ref={ref} />
            <label>{placeholder}</label>
            {icon && <span className='inputarea-container--icon'>{icon}</span>}
        </div>
    );
};

export default React.forwardRef(TextArea);