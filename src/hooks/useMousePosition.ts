import { useEffect, useState, useCallback } from "react";

export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });

    const onMouseMove = useCallback((e: MouseEvent) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY,
        })
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove)
        return () => {
            window.removeEventListener('mousemove', onMouseMove)
        }
    }, [onMouseMove])

    return mousePosition;
}