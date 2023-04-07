import './ImageBanner.scss';
import { Container } from 'reactstrap';

type ImageBannerProps = {
    title: string;
}
const ImageBanner = ({ title }: ImageBannerProps) => {
    return (
        <section className="image__banner">
            <Container className='text-center'>
                <h1>{title}</h1>
            </Container>
        </section>
    )
}

export default ImageBanner