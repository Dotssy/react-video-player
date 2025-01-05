import { useVideoPlayerContext } from '../context/VideoPlayerContext';

const PlayBackRate = () => {
  const { setPlayBackRate } = useVideoPlayerContext();

  return (
    <select
      name="play-back-rate"
      defaultValue={1}
      className="bg-transparent cursor-pointer text-lg font-thin"
      title="Playback speed"
      onChange={(e) => setPlayBackRate(Number(e.target.value))}
    >
      {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((val, i) => {
        return (
          <option value={val} key={i} className="bg-[#2e2d2d] font-thin">
            {`${val}x`}
          </option>
        );
      })}
    </select>
  );
};

export default PlayBackRate;
