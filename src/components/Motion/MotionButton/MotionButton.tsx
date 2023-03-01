import './MotionButton.scss';
import { motion } from 'framer-motion'
import { MouseEvent, ReactNode, HTMLAttributes } from 'react'

interface MotionButtonProps extends HTMLAttributes<HTMLButtonElement> {
    id?: string;
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
    children: ReactNode;
}
const MotionButton = ({ id, className, type, disabled, onClick, children, ...props }: MotionButtonProps) => {
    // const handleClick = useCallback(onClick, []);

    return (
        <motion.button
            id={id}
            className={`motion__button ${className}`}
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