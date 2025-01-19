import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setUploadStatus(''); // Reset status on new selection
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    setIsUploading(true);
    setUploadStatus(''); // Clear any previous status

    try {
      const response = await fetch('http://127.0.0.1:5000/api/data', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Image uploaded successfully! Please wait for the result...');
        setTimeout(() => {
          navigate('/response');
        }, 2000); // Redirect to response page after 2 seconds
      } else {
        setUploadStatus('Image upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Your Image Here</h1>

      <div className="border w-full md:w-[70vh] p-6 py-8 rounded-lg shadow-md flex flex-col items-center space-y-6 bg-white">
        <img src="/tool-box-image.svg" alt="Upload illustration" className="w-40 h-auto" />
        <h2 className="text-lg text-center text-gray-700">Drop or Upload your image</h2>
        <p className="text-gray-500 text-sm text-center">Supported formats: JPG, PNG, JFIF (JPEG), HEIC</p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="imageInput"
        />

        <label
          htmlFor="imageInput"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded cursor-pointer"
        >
          Choose Image
        </label>

        {selectedImage && (
          <p className="text-sm text-gray-600 mt-2 text-center">
            Selected Image: <span className="font-medium text-gray-800">{selectedImage.name}</span>
          </p>
        )}

        <button
          onClick={handleSubmit}
          className={`py-2 px-6 rounded font-semibold text-white mt-4 transition-all duration-300 ${
            isUploading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-700'
          }`}
          disabled={isUploading || !selectedImage}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>

        {uploadStatus && (
          <div
            className={`mt-4 px-4 py-2 rounded-md shadow-md text-sm ${
              uploadStatus.includes('successfully')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {uploadStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
