import './MapViewFrame.scss';
import RootIFrame from '../RootIFrame/RootIFrame';

type MapViewFrameProps = {
  source: string
  className?: string
}
function MapViewFrame({ source, className }: MapViewFrameProps) {

  return (
    <RootIFrame mainClassName={`map-responsive ${className}`} source={source} />
  );
}
export default MapViewFrame;