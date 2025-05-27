// src/pages/CancelPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Payment Cancelled</h1>
      <p className="text-lg mb-6">Your transaction was not completed. You can try again anytime.</p>
      <Link to="/cart" className="text-white bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md shadow">
        Return to Cart
      </Link>
    </div>
  );
};

export default CancelPage;
