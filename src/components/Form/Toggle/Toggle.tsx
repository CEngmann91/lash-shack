import './Toggle.scss';
import React, { ChangeEvent, useState } from 'react'

type CheckboxProps = {
    className?: string;
    isSelected?: boolean;
    onChange: (value: boolean) => void;
}
const Toggle = ({ className, isSelected, onChange }: CheckboxProps) => {
    const [enabled, setEnabled] = useState(isSelected)


    function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
        isSelected = e.target.checked;
        setEnabled(isSelected);
        onChange(isSelected);
    }
    return (
        <div className='wrapper'>
            <input
                type='checkbox' name=''
                checked={enabled}
                onChange={handleCheckboxChange}
            />
        </div>
    )
}

export default Toggle