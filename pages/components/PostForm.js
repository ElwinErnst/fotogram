import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onSubmit }) => {
  const [phrase, setPhrase] = useState('');
  const [image, setImage] = useState(null);

  const handlePhraseChange = (event) => {
    setPhrase(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Subir la imagen a Cloudinary
    const cloudinaryData = new FormData();
    cloudinaryData.append('file', image);
    cloudinaryData.append('upload_preset', 'ml_default'); 

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dkb3pd4uy/image/upload', 
        cloudinaryData
      );  

      // Obtener la URL de la imagen desde la respuesta de Cloudinary
      const imageUrl = response.data.secure_url;
      console.log(imageUrl);
      // Crear el objeto de post con la frase y la URL de la imagen
      const post = {
        phrase,
        image: imageUrl,
        comments: [],
        likes: 0,
      };

      // Enviar el objeto de post a la API
      onSubmit(post);
      
    } catch (error) {
      console.error('Error al subir la imagen a Cloudinary:', error);
    }

    // Limpiar el formulario
    setPhrase('');
    setImage(null);
  };

  return (
    <div className="post-form border border-gray-300 p-4 my-4">
      <h3 className="text-lg font-bold">Create Post</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block mb-2">Phrase:</label>
          <input
            type="text"
            value={phrase}
            onChange={handlePhraseChange}
            className="border border-gray-400 px-2 py-1 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default PostForm;
