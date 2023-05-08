import './SelectDropdown.scss';
import { ChangeEvent } from 'react'

type SelectDropdownProps = {
    className?: string;
    name: string;
    placeholder: string;
    selected: string;
    options: string[];
    onChange: (value: string) => void;
}
const SelectDropdown = ({ className, name, placeholder = "Please Select", selected, options, onChange }: SelectDropdownProps) => {



    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        var value: string = e.currentTarget.value;
        const item = options.filter(option => option === value);
        onChange(item[0]);
    }

    return (
        <div className={`select-container ${className}`}>
            <select
                className='select'
                name={name}
                defaultValue={selected}
                onChange={handleChange}
                required
            >
                <option disabled value="" selected hidden>{placeholder}</option>
                {options?.map(option => <option key={option}>{option}</option>)}
            </select>
            {/* <span className="select-highlight"></span> */}
        </div>
    )
}

export default SelectDropdown