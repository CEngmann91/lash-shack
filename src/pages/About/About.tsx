import './About.scss';
import { ReactNode } from 'react'
import { Container, Row } from 'reactstrap'
import { ArrowMotionButton, FeatureRow } from '../../components';
import images from '../../res/images';
import { useNavigate } from 'react-router-dom';

interface AboutArticle {
    id: number;
    leftContent: ReactNode;
    rightContent: ReactNode;
}
const About = () => {
    const navigate = useNavigate();


    const articles: AboutArticle[] = [
        {
            id: 0,
            leftContent: (
                <div className='d-flex flex-column align-items-start p-3'>
                    <h1 className='mb-3'>Expert Services</h1>
                    <span><strong>Come and unwind.</strong> Our expert team of technicians in Romford have carefully vetted our services to provide excellent quality that adheres to everyone's unique style. So what are you waiting for? Come and experience it for yourself. <strong>Today!</strong></span>
                    <ArrowMotionButton className='w-35 feature-btn' onClick={() => navigate('/services')}>
                        Book An Appointment
                    </ArrowMotionButton>
                </div>
            ),
            rightContent: (
                <img src={images.Training5} alt="" />
            )
        },
        {
            id: 1,
            leftContent: (
                <div className='d-flex flex-column align-items-start p-3'>
                    <h1 className='mb-3'>Become An Expert</h1>
                    <span><strong>Come and Earn your stripes!</strong> Eyelash Extension Course's designed specifically with you in mind to make you an expert. Discover new and exciting ways that you can become a fully qualified Lash Technician or refresh your memory with our Refresher Course at Lash Shack.</span>
                    <ArrowMotionButton className='w-35 feature-btn' onClick={() => navigate('/courses')}>
                        Train Now!
                    </ArrowMotionButton>
                </div>
            ),
            rightContent: (
                <img src={images.Training0} alt="" />
            )
        },
    ];

    return (
        <section className="about__section">
            <Container>
                <Row className='featureRow-Articles'>
                    {articles.map(({ id, leftContent, rightContent }) =>
                        <FeatureRow className='mb-5' key={id} id={id}
                            leftChildren={id % 2 === 0 ? leftContent : rightContent}
                            rightChildren={id % 2 !== 0 ? leftContent : rightContent}
                        />
                    )}
                </Row>
            </Container>
        </section>
    )
}

export default About