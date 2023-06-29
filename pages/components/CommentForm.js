import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  return (
    <div className="comment-form">
      <h4 className="font-semibold">Add Comment</h4>
      <form onSubmit={handleSubmit} className="mt-2">
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          className="border border-gray-400 px-2 py-1 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
