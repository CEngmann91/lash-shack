import { AnimationControls, motion, Target, TargetAndTransition, Transition, VariantLabels, Variants } from 'framer-motion'
import { MouseEvent, ReactNode, HTMLAttributes } from 'react'

export interface MotionLiProps extends HTMLAttributes<HTMLSpanElement> {
    id?: string;
    className?: string;
    hoverScale?: number;
    tapScale?: number;
    variants?: Variants;
    transition?: Transition;
    initial?: boolean | Target | VariantLabels;
    animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean;
    viewportOnce?: boolean;
    children: ReactNode;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}
const MotionLi = ({ id, className, hoverScale = 1.05, tapScale = 0.95, initial, animate, variants, transition, viewportOnce = true, children, onClick }: MotionLiProps) => {

    return (
        <motion.li
            id={id}
            className={className}
            initial={initial}
            animate={animate}
            whileHover={{ scale: hoverScale }}
            whileTap={{ scale: tapScale }}
            viewport={{ once: viewportOnce }}
            variants={variants}
            transition={transition}
            onClick={onClick}
        >
            {children}
        </motion.li>
    )
}

export default MotionLi;