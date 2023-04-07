import MyIFrame from '../MyIFrame/MyIFrame';
import './MapViewFrame.scss';

type MapViewFrameProps = {
  className?: string;
  source: string;
}
const MapViewFrame = ({ className, source }: MapViewFrameProps) => <MyIFrame className={`map-responsive ${className}`} source={source} />

export default MapViewFrame