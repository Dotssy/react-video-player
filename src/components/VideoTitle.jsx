import PropTypes from 'prop-types';

const VideoTitle = ({ title }) => {
  return (
    <div className="flex text-center text-2xl font-medium text-gray-300">
      <h3>{title}</h3>
    </div>
  );
};

VideoTitle.propTypes = {
  title: PropTypes.string,
};

export default VideoTitle;
