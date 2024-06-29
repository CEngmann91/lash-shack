import './ImageBanner.scss';

type ImageBannerProps = {
    title: string;
    subtitle?: string | undefined;
}
const ImageBanner = ({ title, subtitle }: ImageBannerProps) => {
    
    return (
        <section className="image__banner">
            <h1 className="text__neon-pink">{title}</h1>
            {subtitle && <h6 className="text__neon-pink">{subtitle}</h6>}
        </section>
    )
}

export default ImageBanner