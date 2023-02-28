import { useEffect, useState } from "react";

export const useScroller = () => {
    const [scrolledDown, setScrolledDown] = useState(false);


    useEffect(() => {
        const onScroll = () => {
            if (!scrolledDown && window.pageYOffset > 300) {
                setScrolledDown(true)
            }
            else if (scrolledDown && window.pageYOffset <= 300) {
                setScrolledDown(false)
            }
        };


        window.addEventListener('scroll', onScroll, { passive: true })
        return function cleanup() {
            window.removeEventListener('scroll', onScroll)
        }
    })

    return scrolledDown;
}