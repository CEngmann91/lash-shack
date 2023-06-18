import { ReactNode, useState } from 'react'
import { InView, useInView } from 'react-intersection-observer';
import './styles.scss';

interface MotionButtonProps {
    // id?: string;
    // className?: string;
    // onViewChanged: (inView: boolean, entry: IntersectionObserverEntry) => void;
    children: ReactNode;
    // triggerOnce?: boolean;
}
// const DivObserver = ({ id, className, children, onViewChanged, triggerOnce = true }: MotionButtonProps) => {
const DivObserver = ({ children }: MotionButtonProps) => {
    const { ref, inView } = useInView();

    return (
        <div ref={ref} className="fade-in">
            {inView ? children : null}
        </div>

        // <InView
        //     as="div"
        //     id={id}
        //     className={className}
        //     onChange={onViewChanged}
        //     triggerOnce={triggerOnce}
        // >
        //     {children}
        // </InView>
    )
}

export default DivObserver