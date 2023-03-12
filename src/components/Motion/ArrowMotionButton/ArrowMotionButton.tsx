// NOTE!! NO PADDING IS ALLOWED IN CLASSNAME PARAMETER.

import './ArrowMotionButton.scss';
import { ReactNode, HTMLAttributes, MouseEvent } from 'react'
import MotionButton, { MotionButtonProps } from '../MotionButton/MotionButton'

interface ArrowMotionButtonProps extends MotionButtonProps {
}
const ArrowMotionButton = ({ id, className, type, disabled, onClick, children }: ArrowMotionButtonProps) => {
    return (
        <MotionButton
            id={id}
            className={`arrow_motion_button ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </MotionButton>
    )
}

export default ArrowMotionButton