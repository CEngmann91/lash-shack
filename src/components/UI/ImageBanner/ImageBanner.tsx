import './ImageBanner.scss';
import React from 'react'
import { Container } from 'reactstrap';

type ImageBannerProps = {
    title: string;
}
// "Mar 31, 2023"
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