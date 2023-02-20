import './Services.scss'
import React from 'react'
import { ImageBanner, PageWrapper } from '../../components'
import { Container, Row, Col } from 'reactstrap'

const Services = () => {
    return (
        <PageWrapper title="Services">
            <ImageBanner title={'Services'} />

            <section className='services__section'>
                <Container>
                    <Row>
                        <Col>
                            Services
                        </Col>
                    </Row>
                </Container>
            </section>
        </PageWrapper>
    )
}

export default Services