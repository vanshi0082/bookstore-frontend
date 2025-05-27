import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase.config";

// Save wishlist
export const saveWishlistToFirestore = async (uid, wishlistItems) => {
    try {
        console.log("Saving to Firestore, Wishlist: ", wishlistItems);  // Log the wishlist items
        const userRef = doc(db, "wishlists", uid);
        await setDoc(userRef, { items: wishlistItems });
    } catch (error) {
        console.error("Error saving wishlist to Firestore:", error);
    }
};

export const saveCartToFirestore = async (uid, cartItems) => {
  try {
      console.log("Saving to Firestore, Cart: ", cartItems);  // Log the wishlist items
      const userRef = doc(db, "cart", uid);
      await setDoc(userRef, { items: cartItems });
  } catch (error) {
      console.error("Error saving wishlist to Firestore:", error);
  }
};
  

// Load wishlist
export const loadWishlistFromFirestore = async (uid) => {
  const userRef = doc(db, "wishlists", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data().items;
  } else {
    return [];
  }
};

export const loadCartFromFirestore = async (uid) => {
  const userRef = doc(db, "cart", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data().items;
  } else {
    return [];
  }
};