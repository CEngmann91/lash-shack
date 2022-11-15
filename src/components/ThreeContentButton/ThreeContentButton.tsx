import './ThreeContentButton.scss';
import React from 'react'

interface iProps {
    idleText: string;
    hoverText: string;
    activeText: string;
}
const ThreeContentButton: React.FC<iProps> = ({ idleText, hoverText, activeText, ...props }: iProps) => {

    return (
        <button className="button" type="button"
                data-hover={hoverText} data-active={activeText}
        >
            <span>{idleText}</span>
        </button>
    )
}

export default ThreeContentButton