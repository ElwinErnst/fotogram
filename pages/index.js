import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './components/Post';
import PostForm from './components/PostForm';
import LikeButton from './components/LikeButton';
import CommentForm from './components/CommentForm';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  const api = axios.create({
    baseURL: 'http://localhost:3001',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async (formData) => {
    try {
      const response = await api.post('/api/posts', formData);
      const newPost = response.data;
      setPosts((prevPosts) => [...prevPosts, newPost]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await api.post(`/api/posts/${postId}/like`);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error(`Error liking post with ID ${postId}:`, error);
    }
  };

  const handleAddComment = async (postId, comment) => {
    try {
      await api.post(`/api/posts/${postId}/comments`, { comment });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, comment] }
            : post
        )
      );
    } catch (error) {
      console.error(`Error adding comment to post with ID ${postId}:`, error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/api/posts/${postId}`);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error(`Error deleting post with ID ${postId}:`, error);
    }
  };

  return (
    <div>
      <h1>Feed</h1>

      <PostForm onSubmit={handleCreatePost} />

      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          onLike={() => handleLikePost(post._id)}
          onDelete={() => handleDeletePost(post._id)}
        >
          <LikeButton onLike={() => handleLikePost(post._id)} />
          <CommentForm onSubmit={(comment) => handleAddComment(post._id, comment)} />
        </Post>
      ))}
    </div>
  );
};

export default HomePage;
