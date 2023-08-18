import { createSlice } from "@reduxjs/toolkit";
type TProduct = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: [];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
  quantity: number;
}
export const slice = createSlice({
    name: 'basket',
  initialState:JSON.parse(localStorage.getItem('card')) || {
    products: []
  },
  reducers: {
    addProduct: (state, action) => {
      if(!state.products.find((e:TProduct)=>e.id==action.payload.id)){
        state.products.push(action.payload);
        localStorage.setItem(
          'card',
          JSON.stringify({
            products: state.products
          }),
        );
      }
    },
    delProductInCard:(state,action)=>{
      state.products=state.products.filter((e:TProduct)=>e.id!==action.payload)
      localStorage.setItem(
        'card',
        JSON.stringify({
          products: state.products
        }),
      );
      
    },
    increment:(state,action)=>{
      state.products.find((e:TProduct)=>e.id==action.payload).quantity++;
      localStorage.setItem(
        'card',
        JSON.stringify({
          products: state.products
        }),
      );
    },
    decrement:(state,action)=>{
      state.products.find((e:TProduct)=>e.id==action.payload).quantity--;
      localStorage.setItem(
        'card',
        JSON.stringify({
          products: state.products
        }),
      );
    }
}
});

export const {addProduct,delProductInCard,increment,decrement  } = slice.actions;

export default slice.reducer;