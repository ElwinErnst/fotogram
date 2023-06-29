import { connectToDatabase } from '../mongodb';

export default async function handler(req, res) {
  
  if (req.method === 'POST') {
    // Crear un nuevo post
    const { phrase, likes, comments, image } = req.body;
    const { db } = await connectToDatabase();

    const result = await db.collection('posts').insertOne({
      phrase,
      likes: 0,
      comments: [],
      image,
    });

    res.status(201).json({ message: 'Post creado exitosamente', postId: result.insertedId });
  
  } else if (req.method === 'GET') {

    // Obtener todos los posts
    const { db } = await connectToDatabase();
    const posts = await db.collection('posts').find({}).toArray();
    res.status(200).json(posts);

  } else if (req.method === 'POST' && req.query.postId && req.query.action === 'like') {

    // Agregar un like a un post existente
    const postId = req.query.postId;
    const { db } = await connectToDatabase();

    const result = await db.collection('posts').updateOne(
      { _id: postId },
      { $inc: { likes: 1 } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(200).json({ message: 'Like agregado correctamente' });
  
  } else if (req.method === 'POST' && req.query.postId && req.query.action === 'comment') {
    
    // Agregar un comentario a un post existente
    const postId = req.query.postId;
    const { comment } = req.body;
    const { db } = await connectToDatabase();

    const result = await db.collection('posts').updateOne(
      { _id: postId },
      { $push: { comments: comment } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.status(200).json({ message: 'Comentario agregado correctamente' });
  }
}