import './MotionButton.scss';
import { motion } from 'framer-motion'
import React, { useCallback } from 'react'

interface MotionButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    children: React.ReactNode;
}
const MotionButton = ({ className, type, disabled, onClick, children, ...props }: MotionButtonProps) => {
    // const handleClick = useCallback(onClick, []);

    return (
        <motion.button className={`motion__button ${className}`}
            type={type}
            whileHover={{ scale: (disabled ? 1 : 1.02) }} whileTap={{ scale: (disabled ? 1 : 0.98) }}
            onClick={onClick}
            disabled={disabled}
            // {...props}
        >
            {children}
        </motion.button>
    )
}

export default MotionButton;