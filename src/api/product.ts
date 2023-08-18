import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/'}),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    getProducts: build.query({
      query: (q) => `products${q}`,
      providesTags: ['Product'],
    }),
    getCategoryProducts: build.query({
      query: () => `products/categories`,
      providesTags: ['Product'],
    }),
    getElementProducts: build.query({
      query: (q) => `products/category/${q}`,
      providesTags: ['Product'],
    }),
    searchProduct: build.query({
      query: (q) => `products/search?q=${q}`,
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoryProductsQuery,
  useGetElementProductsQuery,
  useSearchProductQuery
} = productsApi;
