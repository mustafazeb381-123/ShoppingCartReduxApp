import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    increaseQty: (state, action) => {
      let myIndex = -1;
      state.map((item, index) => {
        if (item.id == action.payload) {
          myIndex = index;
        }
      });
      if (myIndex == -1) {
      } else {
        state[myIndex].qty = state[myIndex].qty + 1;
      }
    },
    decreaseQty: (state, action) => {
      let myIndex = -1;
      state.map((item, index) => {
        if (item.id == action.payload) {
          myIndex = index;
        }
      });
      if (myIndex == -1) {
      } else {
        state[myIndex].qty = state[myIndex].qty - 1;
      }
    },
  },
});

export const {addProduct, increaseQty, decreaseQty} = productSlice.actions;
export default productSlice.reducer;
