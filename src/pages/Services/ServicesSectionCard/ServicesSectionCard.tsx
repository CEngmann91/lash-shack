import './ServicesSectionCard.scss';
import { MouseEvent, ReactNode, HTMLAttributes } from 'react'


interface ServicesSectionCardProps extends HTMLAttributes<HTMLButtonElement> {
    id?: string;
    className?: string;
    leftChildren: ReactNode;
    rightChildren: ReactNode;
}
const ServicesSectionCard = ({ id, className, leftChildren, rightChildren }: ServicesSectionCardProps) => {

    return <div id={id} className="cards">
        <div className={`card wrapper left ${className}`}>{leftChildren}</div>
        <div className={`card wrapper right ${className}`}>{rightChildren}</div>
    </div>
}

export default ServicesSectionCard