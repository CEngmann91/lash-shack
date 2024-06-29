import './Accordion.scss';
import { ReactNode } from "react";

interface AccordionProps {
    id: string;
    title: string;
    content: ReactNode;
}
const Accordion = ({ id, title, content }: AccordionProps) => {

    return (
        <div className="accordion">
            <div className="drawer">
                <input className="drawer__trigger" id={`drawer-${id}`} type="checkbox" />
                <label className="drawer__title" htmlFor={`drawer-${id}`}>{title}</label>
                <div className="drawer__content-wrapper">
                    <div className="drawer__content">
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Accordion