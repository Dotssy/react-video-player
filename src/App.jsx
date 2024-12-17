import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <h1 className="text-4xl text-center font-bold mb-5 mt-5 text-gray-600">
        Video player in React
      </h1>
      <VideoPlayer />
    </div>
  );
}

export default App;
