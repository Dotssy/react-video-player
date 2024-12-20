import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import VideoPlayerProvider from './context/VideoPlayerProvider.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VideoPlayerProvider>
      <App />
    </VideoPlayerProvider>
  </StrictMode>
);
