import React, { useEffect, useState } from "react";

const useScroll = () => {
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
        window.addEventListener('scroll', onScroll)
        return function cleanup() {
            window.removeEventListener('scroll', onScroll)
        }
    })

    return scrolledDown;
}
export default useScroll