import React, { useState } from 'react'

export const useCounter = (initalValue: number) => {
    const [value, setValue] = useState(initalValue);

    const increment = () => setValue(c => c + 1);
    const decrement = () => setValue(c => c - 1);
    const reset = () => setValue(initalValue);

    return { value, increment, decrement, reset }
}