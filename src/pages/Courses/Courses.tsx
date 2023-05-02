import './Courses.scss';
import { Container, Row, Col } from 'reactstrap'
import { LoadingSpinner, PageWrapper, ProductList } from '../../components'
import ImageBanner from '../../components/UI/ImageBanner/ImageBanner';
import useGetCourses from '../../hooks/useGetCourses';
import { Certificate, Expectations } from '..';

const Courses = () => {
    const { courses, loadingCourses, coursesError } = useGetCourses();


    return (
        <PageWrapper title="Courses">
            <ImageBanner title={'Be Your Own Boss!'} />

            <section className='courses__section'>
                <Container>
                    <Row className=''>
                        {loadingCourses ? (
                            <LoadingSpinner title="Loading..." />
                        ) : (
                            courses?.length === 0 ? (
                                <h1 className='text-center fs-4'>Sorry, No Lashes Here</h1>
                            ) : (
                                <>
                                    {/* <p>Train directly with our Expert and Founder Emma and become an Expert Eyelash Technician in no time!
                                        All Courses require a £50 deposit now, the remaining balance will be requested upon arrival.</p>

                                    <Expectations />

                                    <Certificate /> */}


                                    <ProductList items={courses} />
                                </>
                            )
                        )}
                    </Row>
                </Container>
            </section>
        </PageWrapper>
    )
}

export default Courses