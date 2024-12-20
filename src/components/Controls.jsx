import { useState } from 'react';
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
  BsSkipEndFill,
  BsSkipStartFill,
} from 'react-icons/bs';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

const Controls = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-1 m-auto flex-1">
      <div className="flex flex-row w-full justify-between">
        <span className="text-gray-400">00:00 / 00:00</span>
        <ProgressBar />
        <VolumeControl />
      </div>
      <div className="flex justify-center gap-3 text-gray-300">
        <button onClick={() => {}}>
          <BsSkipStartFill size={20} />
        </button>
        <button onClick={() => {}}>
          <BsFillRewindFill size={20} />
        </button>
        <button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? (
            <BsFillPauseFill size={30} />
          ) : (
            <BsFillPlayFill size={30} />
          )}
        </button>
        <button onClick={() => {}}>
          <BsFillFastForwardFill size={20} />
        </button>
        <button onClick={() => {}}>
          <BsSkipEndFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default Controls;
