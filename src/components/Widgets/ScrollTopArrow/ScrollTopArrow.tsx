import './ScrollTopArrow.scss';
import React, { useState, useEffect } from 'react';
import { UpArrow } from '../../../util/icons';
import useScroll from '../../../helpers/hooks/useScroll';

const ScrollTopArrow: React.FC = () => {
    const visible = useScroll();


    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="scroll-arrow--content" data-visible={visible}>
            <UpArrow onClick={scrollTop} />
        </div>
    );
}

export default ScrollTopArrow