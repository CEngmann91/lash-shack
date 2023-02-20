import React, { useState } from "react";

type CheckboxProps = {
    label: string;
    isSelected?: boolean;
    onChange: (value: boolean) => void;
}
const Checkbox = ({ label, isSelected, onChange }: CheckboxProps) => {
    const [remembered, setRemembered] = useState(isSelected);

    
    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        isSelected = e.target.checked;
        setRemembered(isSelected);
        onChange(isSelected);
    }
    
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    name={label}
                    checked={remembered}
                    onChange={handleCheckboxChange}
                />
                &nbsp;{label}
            </label>
        </div>
    );
}

export default Checkbox;