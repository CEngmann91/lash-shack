import './ImageBanner.scss';

type ImageBannerProps = {
    title: string;
    subtitle?: string;
}
const ImageBanner = ({ title, subtitle = "" }: ImageBannerProps) => {
    
    return (
        <section className="image__banner">
            <h1>{title}</h1>
            {/* <h6>{subtitle}</h6> */}
        </section>
    )
}

export default ImageBanner