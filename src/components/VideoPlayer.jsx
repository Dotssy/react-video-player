import { useEffect, useRef, useCallback, useState } from 'react';
import screenfull from 'screenfull';
import VideoTitle from './VideoTitle';
import Controls from './Controls';
import Buffer from './Buffer';
import { useVideoPlayerContext } from '../context/VideoPlayerContext';
import { videos } from '../data/videos';

const VideoPlayer = () => {
  const {
    currentVideo,
    videoRef,
    progressBarRef,
    isPlaying,
    duration,
    setDuration,
    setTimeProgress,
    setVideoIndex,
    setIsPlaying,
    setCurrentVideo,
    isRepeat,
    setIsRepeat,
    fullScreen,
    setFullScreen,
    setMuteVolume,
    setShowControlls,
  } = useVideoPlayerContext();
  const [isBuffering, setIsBuffering] = useState(true);
  const playAnimationRef = useRef(null);
  const controlsTimerRef = useRef(null);

  const handlePrevious = useCallback(() => {
    setIsBuffering(true);
    setVideoIndex((prev) => {
      const newIndex = prev === 0 ? videos.length - 1 : prev - 1;
      setCurrentVideo(videos[newIndex]);
      return newIndex;
    });
  }, [setVideoIndex, setCurrentVideo]);

  const handleNext = useCallback(() => {
    setIsBuffering(true);
    setVideoIndex((prev) => {
      const newIndex = prev >= videos.length - 1 ? 0 : prev + 1;
      setCurrentVideo(videos[newIndex]);
      return newIndex;
    });
  }, [setVideoIndex, setCurrentVideo]);

  // Fullscreen toggle fn
  const handleFullScreenToggle = useCallback(() => {
    if (fullScreen) {
      screenfull.request(document.getElementById('video-wrapper'));
    } else {
      screenfull.exit();
    }
  }, [fullScreen]);

  // Update progress of the video playback and progress bar
  const updateProgress = useCallback(() => {
    if (videoRef.current && progressBarRef.current && duration) {
      const currentTime = videoRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration, setTimeProgress, videoRef, progressBarRef]);

  // Start the animation when video begins playing
  const startAnimation = useCallback(() => {
    if (videoRef.current && progressBarRef.current && duration) {
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [updateProgress, videoRef, progressBarRef, duration]);

  const skipBackward = useCallback(() => {
    if (videoRef.current) {
      // 15% skip
      const skipLength = (duration / 100) * 15;
      videoRef.current.currentTime -= skipLength;
      updateProgress();
    }
  }, [videoRef, updateProgress, duration]);

  const skipForward = useCallback(() => {
    if (videoRef.current) {
      // 15% skip
      const skipLength = (duration / 100) * 15;
      videoRef.current.currentTime += skipLength;
      updateProgress();
    }
  }, [videoRef, updateProgress, duration]);

  // Hiding controls and cursor on delay 3sec.
  const handleControlsVisibility = useCallback(() => {
    if (isPlaying) {
      controlsTimerRef.current = setTimeout(() => {
        setShowControlls(false);
        videoRef.current.style.cursor = 'none';
      }, 3000);
    }
  }, [isPlaying, setShowControlls, videoRef]);

  // For resetting controls visibility on certain events
  const resetControlsVisibility = useCallback(() => {
    setShowControlls(true);
    videoRef.current.style.cursor = 'auto';
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    handleControlsVisibility();
  }, [setShowControlls, handleControlsVisibility, videoRef]);

  // Playing/pausing the video and updating progress bar
  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
      startAnimation();
    } else {
      videoRef.current?.pause();
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress();
    }
    resetControlsVisibility();

    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [
    videoRef,
    isPlaying,
    startAnimation,
    updateProgress,
    resetControlsVisibility,
  ]);

  // Handling source url change
  useEffect(() => {
    videoRef.current?.load();
  }, [videoRef, currentVideo]);

  // Handling fullscreen toggle
  useEffect(() => {
    if (videoRef.current && screenfull.isEnabled) {
      handleFullScreenToggle();
    }
  }, [videoRef, handleFullScreenToggle]);

  // Checking if we exited fullscreen by other means (Escape button)
  useEffect(() => {
    const checkIfFullScreen = () => {
      if (!document.fullscreenElement) {
        setFullScreen(false);
      }
    };
    // Adding and removing event listener
    document.addEventListener('fullscreenchange', checkIfFullScreen);
    return () =>
      document.removeEventListener('fullscreenchange', checkIfFullScreen);
  }, [setFullScreen]);

  // Handling mouseMove event to show or hide controls
  useEffect(() => {
    const videoWrapper = document.getElementById('video-wrapper');

    videoWrapper.addEventListener('mousemove', resetControlsVisibility);
    return () =>
      videoWrapper.removeEventListener('mousemove', resetControlsVisibility);
  }, [resetControlsVisibility]);

  // Handling onEnded event
  useEffect(() => {
    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      currentVideoRef.onended = () => {
        if (isRepeat) {
          currentVideoRef.play();
        } else {
          handleNext();
        }
      };
    }
    return () => {
      if (currentVideoRef) {
        currentVideoRef.onended = null;
      }
    };
  }, [handleNext, videoRef, isRepeat]);

  // Handling keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.which) {
        case 32: // Space
          setIsPlaying((prev) => !prev);
          e.preventDefault();
          break;

        case 39: // ArrowRight
          skipForward();
          resetControlsVisibility();
          break;

        case 37: // ArrowLeft
          skipBackward();
          resetControlsVisibility();
          break;

        case 70: // F
          setFullScreen((prev) => !prev);
          resetControlsVisibility();
          break;

        case 82: // R
          setIsRepeat((prev) => !prev);
          resetControlsVisibility();
          break;

        case 77: // M
          setMuteVolume((prev) => !prev);
          resetControlsVisibility();
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    skipBackward,
    skipForward,
    setFullScreen,
    setIsRepeat,
    setIsPlaying,
    setMuteVolume,
    resetControlsVisibility,
  ]);

  const onLoadedMetadata = () => {
    const seconds = videoRef.current?.duration;

    if (seconds !== undefined) {
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
    setIsBuffering(false);
  };

  return (
    <div className="min-h-8 bg-[#2e2d2d] flex flex-col gap-3 justify-between items-center text-white p-[0.5rem_10px] rounded shadow-xl">
      <VideoTitle title={currentVideo.title} />
      <div
        className="relative w-full h-[41.5rem] flex content-center"
        id="video-wrapper"
      >
        {isBuffering && <Buffer />}

        <video
          className="w-full rounded"
          ref={videoRef}
          onLoadedMetadata={onLoadedMetadata}
          onClick={() => setIsPlaying((prev) => !prev)}
        >
          <source src={currentVideo.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Controls
          controls={[handlePrevious, handleNext, skipBackward, skipForward]}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
