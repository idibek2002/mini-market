import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from '../api/product'
import Basket from '../reducers/basket'


export const store = configureStore({
  reducer: {
    basket:Basket,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})
setupListeners(store.dispatch)