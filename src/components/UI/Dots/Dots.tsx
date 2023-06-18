import './Dots.scss';
import React from 'react'

type DotsProps = {
    array: any[];
    index: number;
    onChange: (value : number) => void;
}
const Dots = ({ array, index, onChange }: DotsProps) => {

    if (array && array.length < 2)
        return null;

    return (
        <div className='dots-container'>
            {array.map((data, key) => {
                const isActive = key === index;

                return (
                    <div
                        key={key}
                        className={`breadcrumb ${isActive ? "active" : "inactive"}`}
                        onClick={() => onChange(key)}
                    />
                );
            })}
        </div>
    )
}

export default Dots