import './ImageBanner.scss';

type ImageBannerProps = {
    title: string;
}
const ImageBanner = ({ title }: ImageBannerProps) => {
    
    return (
        <section className="image__banner">
            <div className='w-100 text-center'>
                <h1>{title}</h1>
            </div>
        </section>
    )
}

export default ImageBanner