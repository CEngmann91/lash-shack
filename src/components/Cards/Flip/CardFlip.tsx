import './CardFlip.scss';
import React from 'react'

type CardFlipProps = {
    id: number;
    frontClassName: string;
    frontChildren: React.ReactNode;
    backClassName: string;
    backChildren: React.ReactNode;
    // onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
function CardFlip({ id, frontClassName, frontChildren, backClassName, backChildren }: CardFlipProps) {

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