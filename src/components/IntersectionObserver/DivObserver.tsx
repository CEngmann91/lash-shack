import { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer';
import './styles.scss';

interface MotionButtonProps {
    children: ReactNode;
}
const DivObserver = ({ children }: MotionButtonProps) => {
    const { ref, inView } = useInView();

    return (
        <div ref={ref} className="fade-in">
            {inView ? children : null}
        </div>
    )
}

export default DivObserver







/*
import { ReactNode } from 'react'
import { InView } from 'react-intersection-observer';

interface MotionButtonProps {
    id?: string;
    className?: string;
    onViewChanged: (inView: boolean, entry: IntersectionObserverEntry) => void;
    children: ReactNode;
    triggerOnce?: boolean;
}
const DivObserver = ({ id, className, children, onViewChanged, triggerOnce = true }: MotionButtonProps) => {

    return (
        <InView
            as="div"
            id={id}
            className={className}
            onChange={onViewChanged}
            triggerOnce={triggerOnce}
        >
            {children}
        </InView>
    )
}

export default DivObserver
*/