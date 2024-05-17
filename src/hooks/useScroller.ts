import { useCallback, useEffect, useState } from "react";

export const useScroller = () => {
    const [scrolledDown, setScrolledDown] = useState(false);

    const onScroll = useCallback(() => {
        const shouldScrollDown = window.pageYOffset > 300;
        if (scrolledDown !== shouldScrollDown) {
            setScrolledDown(shouldScrollDown);
        }
    }, [scrolledDown]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [onScroll]);

    return scrolledDown;
}