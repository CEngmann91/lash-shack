import { useState } from "react";

export function useToggle(initialValue: boolean, onOpen: () => void, onClose: () => void) {
    const [isOpen, setIsOpen] = useState(initialValue);

    function toggleMe() {
        const notOpen = !isOpen;
        setIsOpen(notOpen);

        if (notOpen) onOpen();
        else onClose();
    }

    return { isOpen, toggleMe };
}