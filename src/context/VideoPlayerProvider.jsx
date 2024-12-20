import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { VideoPlayerContext } from './VideoPlayerContext';
import { videos } from '../data/videos';

const VideoPlayerProvider = ({ children }) => {
  const [videoIndex, setVideoIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(videos[videoIndex]);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const contextValue = {
    currentVideo,
    setCurrentVideo,
    videoRef,
    progressBarRef,
    timeProgress,
    setTimeProgress,
    duration,
    setDuration,
    isPlaying,
    setIsPlaying,
    setVideoIndex,
  };

  return (
    <VideoPlayerContext.Provider value={contextValue}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

//Prop Types
VideoPlayerProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default VideoPlayerProvider;
