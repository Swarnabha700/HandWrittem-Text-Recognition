import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Response = () => {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/data');
        setData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-10 px-4">
      <div className="relative max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-blue-600">OCR Response</h1>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
            title="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="white" fill="none">
              <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span className="text-sm font-medium">Copy</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-600 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center text-lg mt-4">{error}</p>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="text-center text-lg text-gray-800 break-words">{data || 'No data received.'}</p>
          </div>
        )}

        {copied && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-md shadow-md text-sm transition-opacity duration-300 ease-in-out">
            Copied to clipboard!
          </div>
        )}

        <div className="mt-6">
          <a
            href="/"
            className="inline-block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
          >
            Go Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default Response;
