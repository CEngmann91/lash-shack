import { useState } from "react";

export const useToggle = (initial: boolean) => {
    const [isOpen, setIsOpen] = useState<boolean>(initial);
    const toggle = (value?: boolean) => setIsOpen(prev => value !== undefined ? value : !prev);

    return { isOpen, toggle };
}