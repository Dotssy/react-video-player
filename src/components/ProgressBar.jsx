import { useVideoPlayerContext } from '../context/VideoPlayerContext';

const ProgressBar = () => {
  const { progressBarRef, videoRef, setTimeProgress, duration } =
    useVideoPlayerContext();

  const handleProgressChange = () => {
    if (videoRef.current && progressBarRef.current) {
      const newTime = Number(progressBarRef.current.value);
      videoRef.current.currentTime = newTime;
      setTimeProgress(newTime);
      // if progress bar changes while video is on pause
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(newTime / duration) * 100}%`
      );
    }
  };

  return (
    <div className="flex items-center justify-center flex-1">
      <input
        className="max-w-[95%] bg-gray-300"
        ref={progressBarRef}
        type="range"
        defaultValue="0"
        onChange={handleProgressChange}
      />
    </div>
  );
};

export default ProgressBar;
