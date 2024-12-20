import { createContext, useContext } from 'react';

// Context
export const VideoPlayerContext = createContext();

export const useVideoPlayerContext = () => {
  const context = useContext(VideoPlayerContext);

  if (context === undefined) {
    throw new Error(
      'useVideoPlayerContext must be used within an VideoPlayerProvider'
    );
  }

  return context;
};
