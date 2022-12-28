import './CheckBox.scss';
import React from 'react'
import { GiCheckMark } from 'react-icons/gi';
import { useToggle } from '../../helpers/hooks';

type AvatarProps = {
    label?: string;
    width?: string;
    height?: string;
    onChange: (value: boolean) => void;
}
function CheckBox({ label, width = "1rem", height = "1rem", onChange }: AvatarProps) {
    const { isOpen, toggleMe } = useToggle(false, () => { }, () => { });


    return (
        <section onClick={() => { toggleMe(); onChange(isOpen); }}>
            <div className='box'
                style={{ width: width, height: height }}
                
            >
                <GiCheckMark className="check" data-checked={isOpen}
                    style={{ width: width, height: height, display: (isOpen ? "flex" : "none") }}
                />
            </div>
            {label ? <p>{label}</p> : null}
        </section>
    )
}

export default CheckBox