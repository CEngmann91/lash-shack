import './ShoppingBasketDrawerButton.scss';
import React, { useCallback } from 'react';
import { ShoppingBasket } from '../../../util/icons';

interface iProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: number;
    isOpen: boolean;
    onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
const ShoppingBasketDrawerButton: React.FC<iProps> = ({ value, isOpen, onClick, ...props }: iProps) => {
    const handleClick = useCallback(onClick, []);

    return (
        <div className="shopping-button-container">
            <button className='border-button' onClick={handleClick} data-count={value} {...props}>
                {!isOpen ?
                    <>
                        <ShoppingBasket />
                        <div className="indicator" style={{ display: value > 0 ? 'flex' : 'none' }}>
                            {/* <span data-count={value > 99}> */}
                            <span>
                                {value > 99 ? "99+" : value}
                            </span>
                        </div>
                    </>
                    :
                    <span>X</span>
                }
            </button>
        </div>
    )
}

export default ShoppingBasketDrawerButton