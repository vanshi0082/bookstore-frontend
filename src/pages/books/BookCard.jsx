import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { addToWishlist } from '../../redux/features/wishlist/wishlistSlice';
import { useAuth } from "../../context/AuthContext";

const BookCard = ({ book, showRemove = false, onRemove }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const handleAddToCart = () => {
    dispatch(addToCart({ item: book, uid: currentUser.uid }));
  };

  const handleAddToWishlist = () => {
    if (!currentUser) {
      alert("Please log in to add to your wishlist.");
      return;
    }
    dispatch(addToWishlist({ item: book, uid: currentUser.uid }));
    //console.log(currentUser.uid);
    
  };

  return (
    <div className="rounded-lg transition-shadow duration-300 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 md:h-[260px] sm:justify-center gap-4">
        <div className="relative sm:h-72 sm:flex-shrink-0 border rounded-md md:h-full">
          <button
            onClick={handleAddToWishlist}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:text-red-500 transition-colors z-10"
            title="Add to Wishlist"
          >
            <AiOutlineHeart size={20} />
          </button>

          <Link to={`/books/${book._id}`}>
            <img
              src={book?.coverImage}
              alt={book?.title}
              className="md:w-full md:m-0 ml-[73px] bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div>
          <Link to={`/books/${book._id}`}>
            <h3 className="text-base font-semibold hover:text-blue-600 mb-3 mt-6">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book?.description.length > 80
              ? `${book.description.slice(0, 60)}...`
              : book?.description}
          </p>
          <p className="font-medium mb-5">
            ${book?.newPrice}{' '}
            <span className="line-through font-normal ml-2">
              ${book?.oldPrice}
            </span>
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="btn-primary flex items-center gap-1"
            >
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>

            {showRemove && (
              <button
                onClick={() => onRemove(book)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
