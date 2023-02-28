import './LatestNews.scss';
import { ImageBanner, PageWrapper } from '../../components'
import { Container, Row, Col } from 'reactstrap';

const LatestNews = () => {

    return (
        <PageWrapper title="Latest News">
            <ImageBanner title={'Latest News'} />


            <section className='register__container'>
                <Container>
                    <Row>
                        <Col>
                            Latest News
                        </Col>

                        <Col>
                            Latest News
                        </Col>
                    </Row>
                </Container>
            </section>
        </PageWrapper>
    )
}

export default LatestNews