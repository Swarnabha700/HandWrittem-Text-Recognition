import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/data', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully!');
        navigate("/response");

      } else {
        console.error('Image upload failed.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Upload Your Image Here</h1>

      <div className="border w-full md:w-[70vh] p-4 py-10 rounded-md mb-4 flex flex-col items-center space-y-4">
        <img src="/tool-box-image.svg" alt="" className="w-auto h-auto max-w-full max-h-full" />
        <h2 className='text-lg text-center'>Drop or Upload image</h2>
      <p className='text-gray-400 text-base text-center'>Supported formats: JPG, PNG, JFIF (JPEG), HEIC</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="imageInput"

        />
        
        <label
          htmlFor="imageInput"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Choose Image
        </label>

        {selectedImage && (
          <p className="mt-2 text-center">
            Selected Image: {selectedImage.name}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          disabled={!selectedImage}
        >
          Upload
        </button>
      
      </div>
    </div>
  );
};

export default Home;
