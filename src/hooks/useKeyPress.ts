/*import { useEffect, useState } from "react";

export function useKeyPress(targetKey: string): boolean {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);


    // If pressed key is our target key then set to true
    function downHandler(key: KeyboardEvent): void {
        if (key.code === targetKey) {
            setKeyPressed(true);
        }
    }
    // If released key is our target key then set to false
    const upHandler = (key: KeyboardEvent): void => {
        if (key.code === targetKey) {
            setKeyPressed(false);
        }
    };
    // Add event listeners
    useEffect(() => {
        window.addEventListener("keydown", downHandler, false);
        window.addEventListener("keyup", upHandler, false);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", downHandler, false);
            window.removeEventListener("keyup", upHandler, false);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
}*/