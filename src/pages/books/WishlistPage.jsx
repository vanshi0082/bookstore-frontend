import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BookCard from '../books/BookCard';
import { clearWishlist } from '../../redux/features/wishlist/wishlistSlice';
import { useAuth } from "../../context/AuthContext";

import { removeFromWishlist } from '../../redux/features/wishlist/wishlistSlice';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const handleRemove = (book) => {
    dispatch(removeFromWishlist({ item: book, uid: currentUser.uid }));
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist({ uid: currentUser.uid }));
  };

  // ...
  return (
    <div className="mt-12 px-4 py-6">
      {/* header... */}
      {wishlistItems.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {wishlistItems.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              showRemove={true}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No items in wishlist!</p>
      )}
      {/* footer... */}
    </div>
  );
};


export default WishlistPage;
