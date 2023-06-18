import './FeatureRow.scss';
import { ReactNode } from 'react'
import { motion } from 'framer-motion';
import { DivObserver } from '../..';

const variants = {
    // visible: {
    //     y: 0,
    //     opacity: 1,
    //     transition: {
    //         duration: 0.5,
    //         // delay: id * 0.1,
    //         ease: 'easeIn'
    //     }
    // },
    hidden: { opacity: 0, y: 100 },
}

type FeatureRowProps = {
    id: number;
    className?: string;
    leftChildren: ReactNode;
    rightChildren: ReactNode;
}
const FeatureRow = ({ id, className, leftChildren, rightChildren }: FeatureRowProps) => {

    return (
        <div
            className={`container row-card w-100" ${className}`}
        >
            <div className="row bg-gray-950 d-flex">
            <div className={`col-lg-6 ${id % 2 === 0 ? "pink" : null}`}>
                    {leftChildren}
                </div>
                <div className={`col-lg-6 ${id % 2 !== 0 ? "pink" : null}`}>
                    <div className="card-block">
                        {rightChildren}
                    </div>
                </div>
            </div>
        </div>



        // <DivObserver
        //     className={`container row-card w-100" ${className}`}
        //     onViewChanged={(inView, entry) => console.log('Inview:', inView)}
        //     triggerOnce={true}
        // >
        //     <div className="row bg-gray-950 d-flex">
        //         <div className={`col-lg-6 ${id % 2 === 0 ? "pink" : null}`}>
        //             {leftChildren}
        //         </div>
        //         <div className={`col-lg-6 ${id % 2 !== 0 ? "pink" : null}`}>
        //             <div className="card-block">
        //                 {rightChildren}
        //             </div>
        //         </div>
        //     </div>
        // </DivObserver>
    );
}

export default FeatureRow