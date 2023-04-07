import React, { useState } from 'react'

import './RadioOptionGroup.scss';
import { ChangeEventHandler } from 'react';

type RadioOptionGroupProps = {
    wrapperClassName?: string;
    radioOptionClassName?: string;
    radioOptionTitleClassName?: string;
    value: number;
    options: string[];
    onChange: (value: number) => void;
    disabled?: boolean;
}
const RadioOptionGroup = ({ wrapperClassName, radioOptionClassName, radioOptionTitleClassName, value = 0, options, onChange, disabled }: RadioOptionGroupProps) => (
    <div className={`radio-group-options ${wrapperClassName}`}>
        {options.map((option, key) => (
            <label className={`radio ${radioOptionClassName}`}>
                <input type="radio" disabled={disabled} checked={value === key} onChange={() => onChange(key)} />
                <span className={`name ${radioOptionTitleClassName}`}>{option}</span>
            </label>
        ))}
    </div>
)

export default RadioOptionGroup