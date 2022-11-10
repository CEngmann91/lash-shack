import './MeetExperts.scss';
import React, { useEffect } from 'react'
import { Page, PhotoFrame } from '../../components';
import { Emma, Louisa, Shannon } from '../../util/images';
import ExpertCard from './ExpertCard/ExpertCard';
import useIsMobile from '../../helpers/hooks/useIsMobile';

export interface iExpert {
    id: number;
    name: string;
    position: string;
    imgSrc: string;
}
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

const MeetExperts = () => {
    const isMobile = useIsMobile();


    useEffect(() => {
        if (isMobile)
            // If Mobile, make sure we swap the 2nd element with the first to enusre Emma is first.
            [experts[0], experts[1]] = [experts[1], experts[0]];
    }, [isMobile])




    return (
        <Page id='meet' className='app__meet-experts-banner' header='Meet Our Experts' headerClassName='app__meet-experts-banner-title'>
            <div className="list" data-ismobile={isMobile}>
                {experts.map(({ id, name, position, imgSrc }) =>
                    <div key={id}>
                        {/* <ExpertCard id={id} name={name} position={position} imgSrc={imgSrc} /> */}
                        <PhotoFrame key={id} imgSource={imgSrc} width="17rem" height="22rem" className='frame' />
                    </div>
                )}
            </div>
        </Page>
    )
}

export default MeetExperts