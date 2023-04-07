import './Courses.scss';
import { Container, Row, Col } from 'reactstrap'
import { LimitedTimeOffer, LoadingSpinner, PageWrapper, ProductList } from '../../components'
import images from '../../res/images'
import ImageBanner from '../../components/UI/ImageBanner/ImageBanner';
import useGetCourses from '../../hooks/useGetCourses';

const Courses = () => {
    const { courses, loadingCourses, coursesError } = useGetCourses();


    return (
        <PageWrapper title="Courses">
            <ImageBanner title={'Become A Lash Expert'} />

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
                        {loadingCourses
                            ?
                            <LoadingSpinner title="Loading..." />
                            :
                            (
                                courses?.length === 0 ?
                                    <h1 className='text-center fs-4'>Sorry, No Lashes Here</h1>
                                    :
                                    <ProductList items={courses} />
                            )
                        }
                    </Row>
                </Container>
            </section>


        </PageWrapper>
    )
}

export default Courses