import { useState, useEffect } from 'react';
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from 'react-icons/io';
import { useVideoPlayerContext } from '../context/VideoPlayerContext';

const VolumeControl = () => {
  const [volume, setVolume] = useState(60);
  const { videoRef, muteVolume, setMuteVolume } = useVideoPlayerContext();

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      videoRef.current.muted = muteVolume;
    }
  }, [videoRef, volume, muteVolume]);

  return (
    <div className="flex items-center gap-2 max-w-[7.5rem]">
      <button onClick={() => setMuteVolume((prev) => !prev)}>
        {muteVolume || volume == 0 ? (
          <IoMdVolumeOff size={25} />
        ) : volume < 40 ? (
          <IoMdVolumeLow size={25} />
        ) : (
          <IoMdVolumeHigh size={25} />
        )}
      </button>
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        className="volume"
        onChange={handleVolumeChange}
        style={{
          background: `linear-gradient(to right, #8dafff ${volume}%, #ccc ${volume}%)`,
        }}
      />
    </div>
  );
};

export default VolumeControl;
