import React, { useEffect, useState } from "react";

export const useScroller = () => {
    const [scrolledDown, setScrolledDown] = useState(false);

    const onScroll = () => {
        if (!scrolledDown && window.pageYOffset > 400) {
            setScrolledDown(true)
        }
        else if (scrolledDown && window.pageYOffset <= 400) {
            setScrolledDown(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onScroll, { passive: false })
        return function cleanup() {
            window.removeEventListener('scroll', onScroll)
        }
    })

    return scrolledDown;
}
// export default useScroll