import React, { useEffect, useState } from "react";

export default function useDeviceDetect() {
    const [isMobile, setMobile] = useState(false);

    function handleResize() {
        const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
        const mobile = Boolean(
            userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
        );
        setMobile(mobile);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return function cleanup() {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    return { isMobile };
}