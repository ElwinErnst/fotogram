import React from 'react';
import LikeButton from './LikeButton';
import CommentForm from './CommentForm';

const Post = ({ post, onLike, onComment, onDelete }) => {
  const handleLike = () => {
    onLike(post._id);
  };

  const handleComment = (comment) => {
    onComment(post._id, comment);
  };

  const handleDelete = () => {
    onDelete(post._id);
  };

  return (
    <div className="post border border-gray-300 p-4 my-4">
      <div className="post-content">
        <img src={post.image} alt="Post" className="mb-2" />
        <p>{post.phrase}</p>
      </div>
      <div className="post-actions">
        <div className="flex items-center justify-between">
          <LikeButton onLike={handleLike} />
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
        <CommentForm onSubmit={handleComment} />
        {post.comments.length > 0 && (
          <div className="post-comments mt-4">
            <h4 className="font-semibold">Comments</h4>
            <ul className="list-disc list-inside">
              {post.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
