import { useEffect, useState } from "react";

export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });


    useEffect(() => {
        const onMouseMove = (e: any) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            })
        };

        window.addEventListener('mousemove', onMouseMove)
        return function cleanup() {
            window.removeEventListener('mousemove', onMouseMove)
        }
    })

    return mousePosition;
}