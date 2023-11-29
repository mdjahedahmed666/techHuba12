import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Home from "../pages/Home/Home";
import AllProducts from "../pages/AllProducts/AllProducts";
import PrivateRoute from "./PriviteRoute";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Dashboard from "../layouts/Dashboard";
import MyProfile from "../pages/MyProfile/MyProfile";
import AddProduct from "../pages/AddProduct/AddProduct";
import MyProducts from "../pages/MyProducts/MyProducts";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import StatisticsPage from "../pages/StatisticsPage/StatisticsPage";
import AdminHome from "../pages/AdminHome/AdminHome";

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
       {
        path: "/productDetails/:id",
        element: <PrivateRoute><ProductDetails/></PrivateRoute>,
       },
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // normal user routes
        {
          path: 'myProfile',
          element: <MyProfile/>
        },
        {
          path: 'addProduct',
          element: <AddProduct/>
        },
        {
          path: 'myProducts',
          element: <MyProducts/>
        },

        //adminRoutes
        {
          path: 'adminHome',
          element: <AdminHome/>
        },
        {
          path: 'manageUsers',
          element: <ManageUsers/>
        },
        {
          path: 'statistics',
          element: <StatisticsPage/>
        },

      ]
    }
  ]);

  export default router;