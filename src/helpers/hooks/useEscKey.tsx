import React, { useEffect, useState } from "react";
import { useKeyDown } from "./useKeyDown";

export const useEscKey = () => {
    const { key } = useKeyDown();

    let isPressed = (key === "Escape");
    return { isPressed }






    /*
    const [isPressed, setPressed] = useState(false);

    const handler = (event: KeyboardEvent) => {
        if (event.key !== "Escape")
        {
            setPressed(false);
            return;
        }
        setPressed(true);
    };

    useEffect(() => {
        window.addEventListener('keydown', handler)
        return function cleanup() {
            window.removeEventListener('keydown', handler)
        }
    })

    return { isPressed };
    */
}