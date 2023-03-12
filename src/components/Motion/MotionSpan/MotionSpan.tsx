import { motion } from 'framer-motion'
import { MouseEvent, ReactNode, HTMLAttributes } from 'react'

export interface MotionSpanProps extends HTMLAttributes<HTMLSpanElement> {
    id?: string;
    className?: string;
    hoverScale?: number;
    tapScale?: number;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
    children: ReactNode;
}
const MotionSpan = ({ id, className, hoverScale = 1.05, tapScale = 0.95, onClick, children }: MotionSpanProps) => {

    return (
        <motion.span
            id={id}
            className={`${className}`}
            whileHover={{ scale: hoverScale }} whileTap={{ scale: tapScale }}
            onClick={onClick}
        >
            {children}
        </motion.span>
    )
}

export default MotionSpan;