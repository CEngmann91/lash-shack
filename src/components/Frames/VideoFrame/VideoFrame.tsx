import './VideoFrame.scss';
import RootIFrame from '../RootIFrame/RootIFrame';

type VideoFrameProps = {
  source: string
  className?: string
  allowFullScreen?: boolean;
}
function VideoFrame({ source, className, allowFullScreen }: VideoFrameProps) {

  return (
    <RootIFrame mainClassName={`video-container ${className}`} source={source} allowFullScreen={allowFullScreen} />
  );
}
export default VideoFrame;