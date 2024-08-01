import React, { useState } from 'react';
import axios from 'axios';

const UploadItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); 
  const [image, setImage] = useState(null); 
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5001/api/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Item uploaded successfully:', response.data);
      setTitle('');
      setDescription('');
      setCategory('');
      setImage(null);
      setError(null);
    } catch (error) {
      console.error('Error uploading item:', error);
      setError('Failed to upload item');
    }
  };

  return (
    <div className="upload-item">
      <h2>Upload New Item</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Item title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Item description"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Item category"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default UploadItem;
