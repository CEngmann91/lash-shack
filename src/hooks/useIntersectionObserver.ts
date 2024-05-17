import { useEffect, useRef } from 'react';

export default function useIntersectionObserver(elementRef: React.RefObject<Element>, callback: () => void, options?: IntersectionObserverInit) {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (elementRef.current) {
            observer.current = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callback();
                    }
                });
            }, options);

            observer.current.observe(elementRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [elementRef, callback, options]);
}