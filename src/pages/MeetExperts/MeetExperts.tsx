import './MeetExperts.scss';
import React from 'react'
import { Page } from '../../components';
import { Emma, Louisa, Shannon } from '../../util/images';
import ExpertCard from './ExpertCard/ExpertCard';

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
    {
        id: 3,
        name: "John Doe",
        position: "Lash Expert",
        imgSrc: Emma
    }
]
const MeetExperts = () => {

    return (
        <Page id='meet' className='app__meet-experts-banner' header='Meet Our Experts' headerClassName='app__meet-experts-banner-title'>
            <div className="list">
                {/* <div className="item">
                    <div>1</div>
                </div>
                <div className="item">
                    <div>2</div>
                </div>
                <div className="item">
                    <div>3</div>
                </div>
                <div className="item">
                    <div>4</div>
                </div> */}

                {/* {experts.map(({ id, name, position, imgSrc }) =>
                    <ExpertCard id={id} name={name} position={position} imgSrc={imgSrc} />
                )} */}


                {experts.map(({ id, name, position, imgSrc }) =>
                    <ExpertCard id={id} name={name} position={position} imgSrc={imgSrc} />
                )}
            </div>
        </Page>
    )
}

export default MeetExperts