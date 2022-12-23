import React, { useEffect, useState } from "react";

export const useKeyDown = () => {
    const [key, setKey] = useState("");

    const handler = (event: KeyboardEvent) => {
        setKey(event.key);
    };

    useEffect(() => {
        window.addEventListener('keydown', handler, { passive: true })
        return function cleanup() {
            window.removeEventListener('keydown', handler)
        }
    })

    return { key };
}