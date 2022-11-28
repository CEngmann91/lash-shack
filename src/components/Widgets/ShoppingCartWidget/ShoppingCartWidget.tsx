import './ShoppingCartWidget.scss';
import React, { useState } from 'react';
import { ShoppingCart } from '../../../util/icons';
import useScroll from '../../../helpers/hooks/useScroll';

const ShoppingCartWidget: React.FC = () => {
    const visible = useScroll();
    const [count, setCount] = useState<number>(0);

    return (
        <div className="shopping-cart-widget" data-visible={visible}>
            <div className='shopping-cart-widget--content' onClick={() => setCount(prev => prev + 1)}>
                <ShoppingCart />
                <div className="indicator" style={{ display: count > 0 ? 'flex' : 'none' }}>
                    <span data-count={count>99}>
                        {count > 99 ? "99+" : count}
                        {/* {visible.toString()} */}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCartWidget