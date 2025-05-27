import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { loadCartFromFirestore, loadWishlistFromFirestore } from "../firebase/firestore.utils"; // You'll create this function
import { setWishlist } from "../redux/features/wishlist/wishlistSlice"; // Adjust path if needed
import { setCart } from "../redux/features/cart/cartSlice";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

export const AuthProvide = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // ✅ Initialize Redux dispatch

  // Register user
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Handle auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(false);
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        const userData = {
          uid,
          email,
          username: displayName,
          photo: photoURL,
        };
        setCurrentUser(userData);

        // ✅ Load wishlist from Firestore
        const wishlistItems = await loadWishlistFromFirestore(uid);
        dispatch(setWishlist(wishlistItems));
        const cartItems = await loadCartFromFirestore(uid);
        dispatch(setCart(cartItems))
      } else {
        setCurrentUser(null);
        dispatch(setWishlist([])); // Clear wishlist on logout
      }
    });

    return () => unsubscribe(); // cleanup
  }, [dispatch]);

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
