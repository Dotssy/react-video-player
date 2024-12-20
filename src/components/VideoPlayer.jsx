import { useEffect } from 'react';
import VideoTitle from './VideoTitle';
import Controls from './Controls';
import { useVideoPlayerContext } from '../context/VideoPlayerContext';

const VideoPlayer = () => {
  const { currentVideo, videoRef, progressBarRef, isPlaying, setDuration } =
    useVideoPlayerContext();

  //Playing/pausing the video and updating animation
  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [videoRef, isPlaying]);

  const onLoadedMetadata = () => {
    const seconds = videoRef.current?.duration;

    if (seconds !== undefined) {
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  };

  return (
    <div className="min-h-8 bg-[#2e2d2d] flex flex-col gap-3 justify-between items-center text-white p-[0.5rem_10px] rounded">
      <VideoTitle title={currentVideo.title} />
      <video
        className="w-full rounded"
        ref={videoRef}
        onLoadedMetadata={onLoadedMetadata}
      >
        <source src={currentVideo.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Controls />
    </div>
  );
};

export default VideoPlayer;
