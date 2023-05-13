import './Breadcrumbs.scss';
import React from 'react'

type BreadcrumbsProps = {
    array: any[];
    index: number;
    onChange: (value : number) => void;
}
const Breadcrumbs = ({ array, index, onChange }: BreadcrumbsProps) => {

    if (array && array.length < 2)
        return null;

    return (
        <div className='breadcrumbs-container'>
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

export default Breadcrumbs