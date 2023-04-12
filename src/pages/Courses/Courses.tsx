import './Courses.scss';
import { Container, Row, Col } from 'reactstrap'
import { LoadingSpinner, PageWrapper, ProductList } from '../../components'
import ImageBanner from '../../components/UI/ImageBanner/ImageBanner';
import useGetCourses from '../../hooks/useGetCourses';

const Courses = () => {
    const { courses, loadingCourses, coursesError } = useGetCourses();


    return (
        <PageWrapper title="Courses">
            <ImageBanner title={'Become A Lash Expert'} />

            <section className='courses__section'>
                <Container>
                    <Row className=''>
                        {loadingCourses ? (
                            <LoadingSpinner title="Loading..." />
                        ) : (
                            courses?.length === 0 ? (
                                <h1 className='text-center fs-4'>Sorry, No Lashes Here</h1>
                            ) : (
                                <ProductList items={courses} />
                            )
                        )}
                    </Row>
                </Container>
            </section>
        </PageWrapper>
    )
}

export default Courses