import './LatestNews.scss';
import { ImageBanner, PageWrapper } from '../../components'

const LatestNews = () => {

    return (
        <PageWrapper title="Latest News">
            <ImageBanner title={'Latest News'} />

            <section className='news__container'>
                Latest News
            </section>
        </PageWrapper>
    )
}

export default LatestNews