import { useState } from "react";

export const useToggle = (initial: boolean) => {
    const [isOpen, setIsOpen] = useState<boolean>(initial);
    const toggle = () => setIsOpen(p => !p);

    return { isOpen, toggle };
}