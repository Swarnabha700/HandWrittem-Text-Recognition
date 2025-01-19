import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Response = () => {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/data');
        setData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false); // Set loading to false after request is complete
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" flex flex-col justify-center items-center bg-gray-50 py-10 px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-blue-600 mb-4">OCR Response</h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-600 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center text-lg mt-4">{error}</p>
        ) : (
          <div>
            <p className="text-center text-lg text-gray-800 mt-4">{data || 'No data received.'}</p>
          </div>
        )}

        <div className="mt-6">
          <a
            href="/"
            className="inline-block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Go Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default Response;
