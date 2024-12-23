import PropTypes from 'prop-types';
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
  BsSkipEndFill,
  BsSkipStartFill,
  BsRepeat,
} from 'react-icons/bs';
import { RiFullscreenFill, RiFullscreenExitFill } from 'react-icons/ri';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import { useVideoPlayerContext } from '../context/VideoPlayerContext';
import formatTime from '../utils/formatTime';

const Controls = ({ controls }) => {
  const {
    isPlaying,
    setIsPlaying,
    isRepeat,
    setIsRepeat,
    duration,
    timeProgress,
    fullScreen,
    setFullScreen,
  } = useVideoPlayerContext();
  const [handlePrevious, handleNext, skipBackward, skipForward] = controls;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-1 m-auto flex-1">
      <div className="flex flex-row w-full justify-between gap-0">
        <span className="text-gray-400">
          {`${formatTime(timeProgress)} / ${formatTime(duration)}`}
        </span>
        <ProgressBar />
        <VolumeControl />
      </div>
      <div className="flex justify-center gap-3 text-gray-300">
        <button onClick={handlePrevious}>
          <BsSkipStartFill size={20} />
        </button>
        <button onClick={skipBackward}>
          <BsFillRewindFill size={20} />
        </button>
        <button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? (
            <BsFillPauseFill size={30} />
          ) : (
            <BsFillPlayFill size={30} />
          )}
        </button>
        <button onClick={skipForward}>
          <BsFillFastForwardFill size={20} />
        </button>
        <button onClick={handleNext}>
          <BsSkipEndFill size={20} />
        </button>
        <button onClick={() => setIsRepeat((prev) => !prev)}>
          <BsRepeat size={20} className={isRepeat ? 'text-[#8dafff]' : ''} />
        </button>
        <button onClick={() => setFullScreen((prev) => !prev)}>
          {fullScreen ? (
            <RiFullscreenExitFill size={20} />
          ) : (
            <RiFullscreenFill size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

Controls.propTypes = {
  controls: PropTypes.arrayOf(PropTypes.func),
};

export default Controls;
