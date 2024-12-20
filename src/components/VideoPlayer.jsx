import VideoTitle from './VideoTitle';
import Controls from './Controls';
import { useVideoPlayerContext } from '../context/VideoPlayerContext';

const VideoPlayer = () => {
  const { currentVideo } = useVideoPlayerContext();

  return (
    <div className="min-h-8 bg-[#2e2d2d] flex flex-col gap-3 justify-between items-center text-white p-[0.5rem_10px] rounded">
      <VideoTitle title={currentVideo.title} />
      <video className="w-full rounded">
        <source src={currentVideo.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Controls />
    </div>
  );
};

export default VideoPlayer;
