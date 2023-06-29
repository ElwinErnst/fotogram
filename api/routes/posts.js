const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Obtener todos los posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
});

// Crear un nuevo post
router.post('/', async (req, res) => {
  try {
    const { phrase, image } = req.body;
    const newPost = new Post({ phrase, image, likes, comments });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el post' });
  }
});

// Agregar un comentario a un post existente
router.post('/:postId/comments', async (req, res) => {
  try {
    const { comment } = req.body;
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    post.comments.push(comment);
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el comentario' });
  }
});

// Dar like a un post existente
router.post('/:postId/like', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    post.likes++;
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al dar "like" al post' });
  }
});

// Eliminar un post existente
router.delete('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
});

module.exports = router;
