import './CardFlip.scss';
import React from 'react'

interface iProps {
    id: number;
    frontClassName: string;
    frontChildren: React.ReactNode;
    backClassName: string;
    backChildren: React.ReactNode;
    // onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
const CardFlip : React.FC<iProps> = ({id, frontClassName, frontChildren, backClassName, backChildren, ...props}: iProps) => {

    return (
        <main>
            <div className="card--wrapper">
                <div className={`front ${frontClassName}`}>
                    {frontChildren}
                </div>

                <div className={`back ${backClassName}`}>
                    {backChildren}
                </div>
            </div>
        </main>
    )
}

export default CardFlip