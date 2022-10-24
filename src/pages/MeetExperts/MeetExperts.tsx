import './MeetExperts.scss';
import React from 'react'
import { Page } from '../../components'

interface iEmployee {
    id: number;
    name: string;
}
const MeetExperts = () => {


    return (
        <Page id='meet' className='app__meet-experts-banner' header='Meet Our Experts' headerClassName='app__meet-experts-banner-title'>
            <div className="list">

            </div>
        </Page>
    )
}

export default MeetExperts