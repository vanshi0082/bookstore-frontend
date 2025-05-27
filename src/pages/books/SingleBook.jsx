import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();
  
    const handleAddToCart = (product) => {
      dispatch(addToCart(product));
    };
  
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
        </div>
      );
    }
    if (isError) {
      return (
        <div className="text-center text-red-500 font-semibold mt-4">
          Error loading book details. Please try again.
        </div>
      );
    }
  
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-6 mb-0 sm:p-8 transition-transform duration-500 ease-in-out hover:scale-105">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-5 animate-fadeIn">{book.title}</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
          <div className="flex justify-center animate-fadeInLeft">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-40 sm:w-56 h-auto rounded-md shadow-md transform transition duration-300 hover:scale-110"
            />
          </div>
  
          <div className="space-y-2 sm:space-y-3 text-sm sm:text-base animate-fadeInRight">
            <p className="text-gray-700">
              <strong>Author:</strong> {book.author || "Unknown"}
            </p>
            <p className="text-gray-700">
              <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 capitalize">
              <strong>Category:</strong> {book?.category || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Description:</strong> {book.description}
            </p>
            <button
              onClick={() => handleAddToCart(book)}
              className="btn-primary hover:text-blue-600 text-black px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-md flex items-center gap-1 sm:gap-2 shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              <FiShoppingCart className="text-sm sm:text-lg" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

export default SingleBook