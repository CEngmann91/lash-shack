import './FeatureRow.scss';
import { ReactNode } from 'react'
import { Col, Row, Container } from 'reactstrap';
import { motion } from 'framer-motion';

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
        // <div id={id} className="row-cards">
        //     <div className={`card wrapper left ${className}`}>
        //         <>
        //             {leftChildren}
        //         </>
        //     </div>
        //     <div className={`card wrapper right ${className}`}>
        //         <>
        //             {rightChildren}
        //         </>
        //     </div>
        // </div>




        // <Container className="row-card m-5">
        //     <Row className="d-flex">
        //         <Col className="p-0" md='6'>
        //             {leftChildren}
        //         </Col>
        //         <Col className="" md='6'>
        //             <div className="card-block">
        //                 {rightChildren}
        //             </div>
        //         </Col>
        //     </Row>
        // </Container>





        // <div className="container m-5">
        //     <div className="row bg-gray-950 d-flex">
        //         <div className="col-md-6 p-0 img-overlay">
        //             <img src="https://losol.no/wp-content/uploads/2017/06/20170502-2054-hovland-05091.jpg" className="img-fluid" />
        //         </div>
        //         <div className="col-md-6 ">
        //             <div className="card-block">
        //                 <h4 className="card-title">Lorem hipster dolor ipsum sit amet</h4>
        //                 <p className="card-text">Dreamcatcher kombucha drinking vinegar cold-pressed hoodie craft beer literally blog microdosing trust organic flannel blue bottle fingerstache. Blog skateboard cronut chips brunch pug. Heirloom coloring book, pitchfork flannel bicycle rights deep v meditation.  </p>
        //                 <a href="#" className="btn btn-outline-primary rounded-0"><i className="fa fa-share" aria-hidden="true"></i> Read more</a>
        //             </div>
        //         </div>
        //     </div>
        // </div>






        <motion.div
            className={`container row-card w-100" ${className}`}
            variants={variants}
            initial="hidden"
            viewport={{ once: true }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5,
                    delay: 0.2,
                    // delay: 1 + id * 0.2,
                    ease: 'easeIn'
                }
            }}
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
        </motion.div>







        // <Container className={`row-card w-100" ${className}`}>
        //     <Row className="d-flex">
        //         <Col className="p-0 img-overlay" md='6'>
        //             {leftChildren}
        //         </Col>
        //         <Col className="" md='6'>
        //             <div className="card-block">
        //                 {rightChildren}
        //             </div>
        //         </Col>
        //     </Row>
        // </Container>

    );
}

export default FeatureRow