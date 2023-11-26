import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Home from "../pages/Home/Home";
import AllProducts from "../pages/AllProducts/AllProducts";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <PageNotFound/>,
      children: [
       {
        path: "/",
        element: <Home/>,
       },
       {
        path: "/login",
        element: <Login/>,
       },
       {
        path: "/register",
        element: <Register/>
       },
       {
        path: "/allProducts",
        element: <AllProducts/>
       },
      ]
    },
  ]);

  export default router;