import React from 'react';

const Pricing = () => {
  return (
    <div className=" flex flex-col items-center bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Our Pricing Plans</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Choose the plan that best suits your needs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {/* Monthly Plan */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Monthly</h2>
          <p className="text-4xl font-bold text-blue-600 mb-4">$10</p>
          <p className="text-gray-600 mb-6">Billed every month</p>
          <ul className="text-gray-600 space-y-2 mb-6 text-center">
            <li>✓ Unlimited uploads</li>
            <li>✓ 24/7 support</li>
            <li>✓ Regular updates</li>
          </ul>
          <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
            Get Started
          </button>
        </div>

        {/* 3 Months Plan */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">3 Months</h2>
          <p className="text-4xl font-bold text-blue-600 mb-4">$25</p>
          <p className="text-gray-600 mb-6">Billed every 3 months</p>
          <ul className="text-gray-600 space-y-2 mb-6 text-center">
            <li>✓ Unlimited uploads</li>
            <li>✓ 24/7 support</li>
            <li>✓ Regular updates</li>
          </ul>
          <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
            Get Started
          </button>
        </div>

        {/* 6 Months Plan */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">6 Months</h2>
          <p className="text-4xl font-bold text-blue-600 mb-4">$45</p>
          <p className="text-gray-600 mb-6">Billed every 6 months</p>
          <ul className="text-gray-600 space-y-2 mb-6 text-center">
            <li>✓ Unlimited uploads</li>
            <li>✓ 24/7 support</li>
            <li>✓ Priority access</li>
          </ul>
          <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
            Get Started
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border-2 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Yearly</h2>
          <p className="text-4xl font-bold text-blue-600 mb-4">$80</p>
          <p className="text-gray-600 mb-6">Billed annually</p>
          <ul className="text-gray-600 space-y-2 mb-6 text-center">
            <li>✓ Unlimited uploads</li>
            <li>✓ 24/7 support</li>
            <li>✓ Exclusive features</li>
            <li>✓ Priority access</li>
          </ul>
          <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

