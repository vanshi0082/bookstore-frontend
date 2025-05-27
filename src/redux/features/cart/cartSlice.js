import { createSlice } from "@reduxjs/toolkit";
import Swal  from "sweetalert2";
import { saveCartToFirestore } from "../../../firebase/firestore.utils";

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers:{
        addToCart: (state, action) => {
            const { item, uid } = action.payload;
            const existingItem = state.cartItems.find(i => i._id === item._id);
            if(!existingItem) {
                state.cartItems = [...state.cartItems, item];
                if (uid) saveCartToFirestore(uid, state.cartItems);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added to the Cart",
                    showConfirmButton: false,
                    timer: 1500
                  });
            } else(
                Swal.fire({
                    title: "Already Added to the Cart",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "OK!"
                  })
            )
        },
        removeFromCart: (state, action) => {
            const { item, uid } = action.payload;
            state.cartItems = state.cartItems.filter(i => i._id !== item._id);
            if (uid) saveCartToFirestore(uid, state.cartItems);
        },
        setCart: (state, action) => {
            state.cartItems = action.payload;
          },
        clearCart: (state) => {
            const { uid } = action.payload;
            state.wishlistItems = [];
            if (uid) saveCartToFirestore(uid, []);
        }
    }
})

// export the actions   
export const  {addToCart, removeFromCart,setCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;