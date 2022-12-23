import './Input.scss';
import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    icon?: string;
    className?: string;
    ref: React.RefObject<HTMLInputElement>;
}
const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ placeholder, icon, className, ref, ...props }) => {
    
    return (
        <div className='input-container'>
            <input {...props} ref={ref} type={props.type} />
            <label>{placeholder}</label>
            {icon && <span className='input-container--icon'>{icon}</span>}
        </div>
    );
};

export default React.forwardRef(Input);












// import './Input.scss';
// import React, { InputHTMLAttributes } from 'react';

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//     placeholder: string;
//     icon?: string;
//     className?: string;
//     ref: React.RefObject<HTMLInputElement>;
// }

// const Input = React.forwardRef(({ placeholder, icon, className, ref, ...props }: InputProps) => (
//     <div className='input-container'>
//         <input {...props} ref={ref} type={props.type} />
//         <label>{placeholder}</label>
//         {icon && <span className='input-container--icon'>{icon}</span>}
//     </div>
// ));