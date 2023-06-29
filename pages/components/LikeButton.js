import React from 'react';

const LikeButton = ({ onLike }) => {
  const handleLike = () => {
    onLike();
  };

  return (
    <button
      onClick={handleLike}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      Like
    </button>
  );
};

export default LikeButton;
