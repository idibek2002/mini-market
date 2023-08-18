import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import Catalog from "./pages/category/Category";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:"category/:id",
        element:<Catalog/>
      },
      {
        path:"product/:id",
        element:<Product/>
      },
      {
        path:"cart",
        element:<Cart/>  
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
