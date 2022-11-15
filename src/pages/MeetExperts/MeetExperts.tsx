import './MeetExperts.scss';
import React, { useEffect } from 'react'
import { SkewedPage } from '../../components';
import { Emma, Louisa, Shannon } from '../../util/images';
import ExpertCard from './ExpertCard/ExpertCard';
import useIsMobile from '../../helpers/hooks/useIsMobile';
import { motion } from 'framer-motion';

export interface iExpert {
    id: number;
    name: string;
    position: string;
    imgSrc: string;
}

const MeetExperts = () => {
    const isMobile = useIsMobile();
    const experts: iExpert[] = [
        {
            id: 0,
            name: "Louisa",
            position: "Lash Expert",
            imgSrc: Louisa
        },
        {
            id: 1,
            name: "Emma",
            position: "CEO",
            imgSrc: Emma
        },
        {
            id: 2,
            name: "Shannon",
            position: "Lash Expert",
            imgSrc: Shannon
        },
        // {
        //     id: 3,
        //     name: "John Doe",
        //     position: "Lash Expert",
        //     imgSrc: Emma
        // }
    ]

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


    // useEffect(() => {
    //     if (isMobile)
    //         // If Mobile, make sure we swap the 2nd element with the first to enusre Emma is first.
    //         [experts[0], experts[1]] = [experts[1], experts[0]];
    // }, [isMobile])




    return (
        <SkewedPage id='meet' className='app__meet-experts-banner' header='Meet Our Experts' headerClassName='app__meet-experts-banner-title'>
            <div className="list" data-ismobile={isMobile}>
                {experts.map(({ id, name, position, imgSrc }) =>
                    <motion.div
                        key={id}
                        variants={variants}
                        initial="hidden"
                        viewport={{ once: true }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.5,
                                delay: 1 + id * 0.2,
                                ease: 'easeIn'
                            }
                        }}
                    >
                        <ExpertCard id={id} name={name} position={position} imgSrc={imgSrc} />
                    </motion.div>
                )}
            </div>
        </SkewedPage>


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