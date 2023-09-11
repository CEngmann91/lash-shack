import { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer';
import './styles.scss';

interface DivObserverProps {
    children: ReactNode;
}
const DivObserver = ({ children }: DivObserverProps) => {
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

interface DivObserverProps {
    id?: string;
    className?: string;
    onViewChanged: (inView: boolean, entry: IntersectionObserverEntry) => void;
    children: ReactNode;
    triggerOnce?: boolean;
}
const DivObserver = ({ id, className, children, onViewChanged, triggerOnce = true }: DivObserverProps) => {

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