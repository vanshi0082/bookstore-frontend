// src/pages/SuccessPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg mb-6">Thank you for your purchase. Your order is being processed.</p>
      <Link to="/" className="text-white bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md shadow">
        Go to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
