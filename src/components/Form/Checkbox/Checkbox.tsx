import React, { useState } from "react";

type CheckboxProps = {
    label: string;
    isSelected?: boolean;
    onChange: (value: boolean) => void;
}
const Checkbox = ({ label, isSelected, onChange }: CheckboxProps) => {
    const [remembered, setRemembered] = useState(false);

    
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




/*import React from 'react'

type CheckboxProps = {
    toggleID: string;
    label?: string;
    onChange: (value: boolean) => void;
    // onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
const Checkbox = ({ toggleID = "toggle", label, onChange }: CheckboxProps) => {

    function handleMainToggle() {
        const checkbox = document.getElementById("password-field") as HTMLInputElement | null;
        if (checkbox != null) {
            if (!checkbox?.checked)
                checkbox.checked = true;
            else
                checkbox.checked = false;

            const isChecked = checkbox.checked;
            onChange(isChecked);
        }
    }

    return (
        <>
            <div style={{ width: 'fit-content', justifyContent: 'center', margin: '0 auto' }} onClick={handleMainToggle}>
                <input className='' id={toggleID} type="checkbox" />
                {label ? <label>&nbsp;{label}</label> : null}
            </div>
        </>
    )
}

export default Checkbox
*/