import { useEffect, useRef, useCallback } from 'react';
import VideoTitle from './VideoTitle';
import Controls from './Controls';
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
  } = useVideoPlayerContext();
  const playAnimationRef = useRef(null);

  const skipBackward = () => {
    if (videoRef.current) {
      // 15% skip
      const skipLength = (duration / 100) * 15;
      videoRef.current.currentTime -= skipLength;
      updateProgress();
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      // 15% skip
      const skipLength = (duration / 100) * 15;
      videoRef.current.currentTime += skipLength;
      updateProgress();
    }
  };

  const handlePrevious = useCallback(() => {
    setVideoIndex((prev) => {
      const newIndex = prev === 0 ? videos.length - 1 : prev - 1;
      setCurrentVideo(videos[newIndex]);
      return newIndex;
    });
  }, [setVideoIndex, setCurrentVideo]);

  const handleNext = useCallback(() => {
    setVideoIndex((prev) => {
      const newIndex = prev >= videos.length - 1 ? 0 : prev + 1;
      setCurrentVideo(videos[newIndex]);
      return newIndex;
    });
  }, [setVideoIndex, setCurrentVideo]);

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

    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [videoRef, isPlaying, startAnimation, updateProgress]);

  const onLoadedMetadata = () => {
    const seconds = videoRef.current?.duration;

    if (seconds !== undefined) {
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  };

  // Handling source url change
  useEffect(() => {
    videoRef.current?.load();
  }, [videoRef, currentVideo]);

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

  return (
    <div className="min-h-8 bg-[#2e2d2d] flex flex-col gap-3 justify-between items-center text-white p-[0.5rem_10px] rounded">
      <VideoTitle title={currentVideo.title} />
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
  );
};

export default VideoPlayer;
