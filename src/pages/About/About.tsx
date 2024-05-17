import './About.scss';
import { ReactNode } from 'react'
// import { Container, Row } from 'reactstrap'
import { ArrowMotionButton, FeatureRow, SkeletonImage, Toggle } from '../../components';
import images from '../../res/images';
import { useNavigate } from 'react-router-dom';
import Parallax from '../../components/Parallax/Parallax';

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
                <SkeletonImage src={images.Training5} alt="" className="" clickable={false} />
                // <img src={images.Training5} alt="" />
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
                <SkeletonImage src={images.Training0} alt="" className="" clickable={false} />
                // <img src={images.Training0} alt="" />
            )
        },
    ];

    return (
        <Parallax
            // backgroundUrl='https://images.unsplash.com/photo-1558985040-ed4d5029dd50?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjIzODkxNjg&ixlib=rb-1.2.1&q=80'
            // backgroundUrl='https://img.freepik.com/free-photo/sideview-young-girl-lying-during-lashes-enlarging_7502-9368.jpg?w=1480&t=st=1683500268~exp=1683500868~hmac=0fdaadc79f0d4a4190b332f0a025a8101d39d13d8fca411c19936a94315997e5'
            // backgroundUrl={images.Client0}
            id="about"
            className="about__section"
        >
            <div className='d-flex w-100 flex-column w-100 featureRow-Articles'>
                {articles.map(({ id, leftContent, rightContent }) =>
                    <FeatureRow className='mb-5' key={id} id={id}
                        leftChildren={id % 2 === 0 ? leftContent : rightContent}
                        rightChildren={id % 2 !== 0 ? leftContent : rightContent}
                    />
                )}
            </div>
            {/* <Container>
                <Row className='featureRow-Articles'>
                    {articles.map(({ id, leftContent, rightContent }) =>
                        <FeatureRow className='mb-5' key={id} id={id}
                            leftChildren={id % 2 === 0 ? leftContent : rightContent}
                            rightChildren={id % 2 !== 0 ? leftContent : rightContent}
                        />
                    )}
                </Row>
            </Container> */}
        </Parallax>


        // <section id="about" className="about__section">
        //     <Container>
        //         <Row className='featureRow-Articles'>
        //             {articles.map(({ id, leftContent, rightContent }) =>
        //                 <FeatureRow className='mb-5' key={id} id={id}
        //                     leftChildren={id % 2 === 0 ? leftContent : rightContent}
        //                     rightChildren={id % 2 !== 0 ? leftContent : rightContent}
        //                 />
        //             )}
        //         </Row>
        //     </Container>
        // </section>
    )
}

export default About