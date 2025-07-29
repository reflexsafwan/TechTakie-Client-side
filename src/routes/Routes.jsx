import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/Dashboard/MyProfile";
import AddProduct from "../pages/Dashboard/AddProduct";
import MyProducts from "../pages/Dashboard/MyProducts";
import ProductDetails from "../pages/Dashboard/ProductDetails";
import UpdateProduct from "../pages/Dashboard/UpdateProduct ";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ProductReviewQueue from "../pages/Dashboard/ProductReviewQueue";
import FeatureProductsDetails from "../pages/Home/FeatureProductsDetails";
import ReportedContents from "../pages/Dashboard/ReportedContents";
import ManageCoupons from "../pages/Dashboard/ManageCoupons";
import ProductDetails2 from "../pages/Dashboard/productDetails2";
import AdminStatistics from "../pages/Dashboard/AdminStatistics";
import ProductsPage from "../pages/ProductsPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      // {
      //   path: "/product/:id",
      //   element: <FeatureProductsDetails></FeatureProductsDetails>,
      // },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails2></ProductDetails2>
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: <ProductsPage></ProductsPage>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      // {
      //   path: "products/:id",
      //   element: <ProductDetails></ProductDetails>,
      // },
      {
        path: "products/:id",
        element: <ProductDetails2></ProductDetails2>,
      },

      {
        path: "update-product/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "review-queue",
        element: (
          <PrivateRoute>
            <ProductReviewQueue></ProductReviewQueue>
          </PrivateRoute>
        ),
      },
      {
        path: "reported-contents",
        element: (
          <PrivateRoute>
            <ReportedContents></ReportedContents>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <PrivateRoute>
            <ManageCoupons></ManageCoupons>
          </PrivateRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <AdminStatistics></AdminStatistics>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);
