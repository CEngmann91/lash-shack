import './MeetExperts.scss';
import React, { useMemo } from 'react'
import { Page } from '../../components';
import { Emma, Louisa, Shannon } from '../../util/images';
import ExpertCard from './ExpertCard/ExpertCard';
import { motion } from 'framer-motion';

export interface iExpert {
    id: number;
    name: string;
    position: string;
    imgSrc: string;
}

const MeetExperts = () => {
    const experts: iExpert[] = useMemo(() => [
        {
            id: 0,
            name: "Emma",
            position: "CEO",
            imgSrc: Emma
            
        },
        {
            id: 1,
            name: "Louisa",
            position: "Lash Expert",
            imgSrc: Louisa
        },
        {
            id: 2,
            name: "Shannon",
            position: "Lash Expert",
            imgSrc: Shannon
        },
    ], []);

    const variants = {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                // delay: 1 + id * 0.2,
                ease: 'easeIn'
            }
        },
        hidden: { opacity: 0, y: 100 },
    }


    return (
        <Page id='meet' className='app__meet-experts-banner' header='We Are Lash Shack' headerClassName='app__meet-experts-banner-title page-title-size'>
            <p className='expert-summary'>
                Lashes are not just our job...it is our obsession.
                We are drivers of the beauty industry and growth across the UK, and have a proven track record across the industry.
                We are commited to empowering you to better yourself every day.
                Find out more about the team below.
            </p>

            <div className="list">
                {experts.map(({ id, name, position, imgSrc }) =>
                    <motion.div
                        key={id}
                        variants={variants}
                        viewport={{ once: true }}
                        initial="hidden"
                        whileInView="visible"
                        // {{
                        //     opacity: 1,
                        //     y: 0,
                        //     transition: {
                        //         duration: 0.5,
                        //         // delay: 1 + id * 0.2,
                        //         ease: 'easeIn'
                        //     }
                        // }}
                    >
                        <ExpertCard id={id} name={name} position={position} imgSrc={imgSrc} />
                    </motion.div>
                )}
            </div>

            {/* <div className="pagination">
                {experts.map(({ id }) =>
                    <button className="item" onClick={() => console.log(id)}>{id}</button>
                )}
            </div> */}
        </Page>








        // <div className="main">
        //     <div className="box">
        //         <div className="wrapper">
        //             <h1 className='head-text title app__meet-experts-banner-title'>Meet Our Experts</h1>
        //             <div className="list" data-ismobile={isMobile}>
        //                 {experts.map(({ id, name, position, imgSrc }) =>
        //                     <motion.div
        //                         key={id}
        //                         variants={variants}
        //                         initial="hidden"
        //                         viewport={{ once: true }}
        //                         whileInView={{
        //                             opacity: 1,
        //                             y: 0,
        //                             transition: {
        //                                 duration: 0.5,
        //                                 delay: id * 0.2,
        //                                 ease: 'easeIn'
        //                             }
        //                         }}
        //                     >
        //                         <ExpertCard id={id} name={name} position={position} imgSrc={imgSrc} />
        //                         {/* <PhotoFrame key={id} imgSource={imgSrc} width="17rem" height="22rem" className='frame' /> */}
        //                     </motion.div>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </div>







        // <Page id='meet' className='app__meet-experts-banner' header='Meet Our Experts' headerClassName='app__meet-experts-banner-title'>
        //     <div className="list" data-ismobile={isMobile}>
        //         {experts.map(({ id, name, position, imgSrc }) =>
        //             <div key={id}>
        //                 {/* <ExpertCard id={id} name={name} position={position} imgSrc={imgSrc} /> */}
        //                 <PhotoFrame key={id} imgSource={imgSrc} width="17rem" height="22rem" className='frame' />
        //             </div>
        //         )}
        //     </div>
        // </Page>
    )
}

export default MeetExperts