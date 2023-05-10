import MyIFrame from '../MyIFrame/MyIFrame';
import './MapViewFrame.scss';

type MapViewFrameProps = {
  className?: string;
  id?: string;
  source: string;
}
const MapViewFrame = ({ className, id, source }: MapViewFrameProps) => <MyIFrame className={`map-responsive ${className}`} id={id} source={source} />

export default MapViewFrame