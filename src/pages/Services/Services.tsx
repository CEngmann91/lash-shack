import './Services.scss'
import { ImageBanner, PageWrapper } from '../../components'
import { Container, Row, Col } from 'reactstrap'
import ServicesSectionCard from './ServicesSectionCard/ServicesSectionCard'
import images from '../../res/images'


const data = [
    {
        id: 0,
        content: {
            left: (
                <div className='p-3'>
                    <h1>First</h1>
                </div>
            ),
            right: (
                <>
                    <img src={images.Landing0} alt="" />
                </>
            )
        }
    },
    {
        id: 1,
        content: {
            left: (
                <div className='p-3'>
                    <h1>Second</h1>
                </div>
            ),
            right: (
                <>
                    <img src={images.Landing1} alt="" />
                </>
            )
        }
    },
    {
        id: 2,
        content: {
            left: (
                <div className='p-3'>
                    <h1>Third</h1>
                </div>
            ),
            right: (
                <>
                    <img src={images.Landing2} alt="" />
                </>
            )
        }
    }
]

const Services = () => {

    // const left =
    //     <div className='p-3'>
    //         <h1>Left Side Baby</h1>
    //     </div>

    // const right =
    //     <>
    //         <img src={images.Landing1} alt="" />
    //     </>


    



    return (
        <PageWrapper title="Services">
            <ImageBanner title={'Services'} />

            <section className='services__section'>
                <Container>
                    <Row className='gap-4'>
                        {data.map(({ id, content }) => {
                            const { left, right } = content;
                            return (
                                <div key={id} className='mt-4'>
                                    <ServicesSectionCard className='' leftChildren={id % 2 === 0 ? left : right} rightChildren={id % 2 !== 0 ? left : right} />
                                </div>
                            )
                        })}

                        {/* <ServicesSectionCard className='' leftChildren={left} rightChildren={right} /> */}
                        {/* <ServicesSectionCard className='' leftChildren={right} rightChildren={left} /> */}

                        {/* <Col>
                            Services
                        </Col> */}
                    </Row>
                </Container>
            </section>
        </PageWrapper>
    )
}

export default Services