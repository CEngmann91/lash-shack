import './Courses.scss';
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { LimitedTimeOffer, PageWrapper } from '../../components'
import images from '../../res/images'
import ImageBanner from '../../components/UI/ImageBanner/ImageBanner';

const Courses = () => {

    return (
        <PageWrapper title="Courses">
            <ImageBanner title={'Courses'} />

            {/* <LimitedTimeOffer
                title="Classic Lash Course"
                subtitle='Limited Offer'
                background='rgb(232, 222, 209)'
                textColour="black"
                imageUrl={images.Lash}
                endDate="Mar 31, 2023"
                onTimerCompleted={() => { }}
            /> */}


            <section className='courses__section'>
                <Container>
                    <Row>
                        <Col>
                            Courses
                        </Col>
                    </Row>
                </Container>
            </section>


        </PageWrapper>
    )
}

export default Courses