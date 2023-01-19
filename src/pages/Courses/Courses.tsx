import './Courses.scss';
import React from 'react'
import { LimitedTimeOffer, PageWrapper } from '../../components'
import images from '../../res/images'
import ImageBanner from '../../components/UI/ImageBanner/ImageBanner';

const Courses = () => {
    
    return (
        <PageWrapper title="Courses">
            <ImageBanner title={'Courses'} />
            
            <LimitedTimeOffer
                title="Valentine's Day"
                subtitle='Limited Offer'
                background='rgb(181, 26, 58)'
                imageUrl={images.LogoNoBG}
                endDate="Feb 14, 2023"
                onTimerCompleted={() => { }}
            />


        </PageWrapper>
    )
}

export default Courses