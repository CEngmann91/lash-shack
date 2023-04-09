import './About.scss';
import { ReactNode } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { ArrowMotionButton, FeatureRow } from '../../components';
import images from '../../res/images';
import MapViewFrame from '../../components/iFrames/MapViewFrame/MapViewFrame';
import { CONTACT } from '../../constants/constants';
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
        /*{
            id: 2,
            leftContent: (
                <div className='d-flex w-100 flex-column'>
                    <div className='d-flex w-90 mx-auto my-auto flex-row p-3 gap-5'>
                        <div>
                            <h1 className='text-center'>Get In Touch</h1>

                            <div className='text-center' style={{ alignItems: 'center' }}>
                                <hr />
                                <p className='text__new-line'>{CONTACT.LOCATIONS.at(0)?.ADDRESS}</p>

                                <a href={CONTACT.EMAIL}>{CONTACT.EMAIL}</a>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-center'>Hours</h1>
                            <div className='text-center'>
                                <hr />
                                <p><strong>Mon - Thu:</strong></p>
                                <p>9:30am - 5.30pm</p>
                                <p><strong>Fri:</strong></p>
                                <p>9:30am - 6.30pm</p>
                                <p><strong>Sat:</strong></p>
                                <p>10am - 2pm</p>
                            </div>
                        </div>
                    </div>
                    <ArrowMotionButton className='w-20 mx-auto feature-btn'>
                        Join Us
                    </ArrowMotionButton>
                </div>
            ),
            rightContent: (
                <div className='d-flex'>
                    <MapViewFrame source={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d679.5204988947316!2d0.15733319970601195!3d51.59129798954456!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a49a4b2a8bd5%3A0x8b08e8d25374186a!2s49%20White%20Hart%20Ln%2C%20Romford%20RM7%208JB!5e1!3m2!1sen!2suk!4v1678780540278!5m2!1sen!2suk"} />
                </div>
            )
        }*/
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