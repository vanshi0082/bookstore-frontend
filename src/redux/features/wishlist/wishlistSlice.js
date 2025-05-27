import { createSlice, current } from "@reduxjs/toolkit";
import Swal  from "sweetalert2";
import { saveWishlistToFirestore } from "../../../firebase/firestore.utils";

const initialState = {
    wishlistItems: []
}

const wishlistSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers:{
        addToWishlist: (state, action) => {
            const { item, uid } = action.payload;
            const existingItem = state.wishlistItems.find(i => i._id === item._id);
        
            if (!existingItem) {
                state.wishlistItems = [...state.wishlistItems, item];
        
                if (uid) saveWishlistToFirestore(uid, state.wishlistItems);
        
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added to the Wishlist",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    title: "Already Added to the Wishlist",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "OK!"
                });
            }
        },
        removeFromWishlist: (state, action) => {
            const { item, uid } = action.payload;
            state.wishlistItems = state.wishlistItems.filter(i => i._id !== item._id);
            if (uid) saveWishlistToFirestore(uid, state.wishlistItems);
        },        
        setWishlist: (state, action) => {
            state.wishlistItems = action.payload;
          },
          clearWishlist: (state, action) => {
            const { uid } = action.payload;
            state.wishlistItems = [];
            if (uid) saveWishlistToFirestore(uid, []);
        },
        
    }
})

// export the actions   
export const  {addToWishlist, removeFromWishlist, clearWishlist,setWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;