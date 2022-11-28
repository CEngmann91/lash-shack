import '../../res/styles.scss';
import React from 'react';
import ScrollTopArrow from './ScrollTopArrow/ScrollTopArrow';
import ShoppingCartWidget from './ShoppingCartWidget/ShoppingCartWidget';

const Widgets: React.FC = () => {

    return (
        <>
            <ScrollTopArrow />
            <ShoppingCartWidget />
        </>
    )
}

export default Widgets