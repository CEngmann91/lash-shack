import React, { useCallback, useLayoutEffect } from "react";

export const useScrollLock = () => {
    const lockScroll = useCallback(
        () => {
            document.body.style.overflow = "hidden";
        }, [])

    const unlockScroll = useCallback(
        () => {
            document.body.style.overflow = "scroll";
        }, [])

    return { lockScroll, unlockScroll };
}