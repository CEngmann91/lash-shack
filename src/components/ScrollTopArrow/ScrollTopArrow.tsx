import './ScrollTopArrow.scss';
import React, { useState, useEffect } from 'react';
import { UpArrow } from '../../util/icons';

const ScrollTopArrow: React.FC = () => {
    const [visible, setVisible] = useState(false)


    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return function cleanup() {
            window.removeEventListener('scroll', onScroll)
        }
    })


    const onScroll = () => {
        if (!visible && window.pageYOffset > 400) {
            setVisible(true)
        }
        else if (visible && window.pageYOffset <= 400) {
            setVisible(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="scroll-arrow-content" style={{ display: visible ? 'flex' : 'none' }}>
            <UpArrow onClick={scrollTop} />
        </div>
    );
}

export default ScrollTopArrow