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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 2a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H8zm8 12H8V4h8v10zm-6 2a2 2 0 01-2-2H4a2 2 0 01-2-2V6a2 2 0 012-2h2v2H4v10h6v2z" />
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
