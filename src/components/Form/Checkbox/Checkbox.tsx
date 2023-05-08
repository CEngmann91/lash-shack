import './Checkbox.scss';
import { ChangeEvent, useState } from "react";

type CheckboxProps = {
    className?: string;
    label: string;
    isSelected?: boolean;
    onChange: (value: boolean) => void;
}
const Checkbox = ({ className, label, isSelected, onChange }: CheckboxProps) => {
    const [checked, setChecked] = useState(isSelected)

    
    function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
        isSelected = e.target.checked;
        setChecked(isSelected);
        onChange(isSelected);
    }
    
    return (
        <div className={`checkbox ${className}`}>
            <label>
                <input
                    type="checkbox"
                    name={label}
                    checked={checked}
                    onChange={handleCheckboxChange}
                />
                &nbsp;{label}
            </label>
        </div>
    );
}

export default Checkbox;