import './NotFound.scss'
import { useNavigate } from 'react-router-dom';
import { ArrowMotionButton, PageWrapper } from '../../components'

const NotFound = () => {
    const navigate = useNavigate();    

    return (
        <PageWrapper title="NotFound">
            <section className='app__notFound app__flex app__pad-hor'>
                <div className='main-404 app__flex'>
                    <h1 className='head-text'>404</h1>
                    <p className='not-found'>Not Found</p>
                </div>

                <label className="information">Ooops!! No Lashes here.</label>

                <div className="notfound__buttons">
                    <ArrowMotionButton className='notfound__cta-button notfound__cta-contactButton' onClick={() => navigate('/contact')}>
                        Contact Us
                    </ArrowMotionButton>
                    <ArrowMotionButton className='notfound__cta-button' onClick={() => navigate('/')}>
                        Go Home
                    </ArrowMotionButton>
                </div>
            </section>
        </PageWrapper>
    );
}

export default NotFound