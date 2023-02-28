import './GalleryCard.scss';
import { SkeletonImage } from '../../../components';

type GalleryCardProps = {
    url: string;
}
const GalleryCard = ({ url }: GalleryCardProps) => <SkeletonImage className='' src={url} alt="" />

export default GalleryCard