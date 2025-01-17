import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App.jsx';
import VideoPlayerProvider from './context/VideoPlayerProvider.jsx';
import './styles/index.css';
import './styles/customize-progress-bar.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VideoPlayerProvider>
      <App />
    </VideoPlayerProvider>
    <SpeedInsights />
  </StrictMode>
);
