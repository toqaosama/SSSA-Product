import { createBrowserRouter, Navigate } from "react-router-dom";
import App from './App';
import Home from "./Home/Home";
import NotFound from "./Shared/Error";
import Register from "./Auth/RegisterModal";
import BehindStory from "./Component/AboutUs/Section/BehindStory";
import Support from "./Component/Support/Section/Support";
import Services from "./Component/Categores/Services";
import Sales from "./Component/Sales/Section/Sales";
import Offers from "./Component/Offers/Section/Offers";
import ResetPassword from "./Component/ResetPassword/ResetPassword";


// Layouts for admin pages onlyyyyyyy////////////////////////////////////////////////////////////////////////////////////
import AdminLayout from "./Layout/AdminLayout";
import AdminDashboard from "./Component/Admin/AdminDashboard";
import AdminTables from "./Component/Admin/UserMangement";
import Product from "./Component/Admin/ProductManagement ";
import Categories from "./Component/Admin/CategoryManagement ";
import OfferTable from "./Component/Admin/OfferManagement";
import Meeting from "./Component/Admin/MeetingManagement";
import Review from "./Component/Admin/ReviewManagement";
import Profile from "./Component/Profile/Section/Profile";
import Orders from "./Component/Orders/Section/Orders";
import Cart from "./Component/Cart/Section/Cart";
import ProductsDetails from './Component/ProductsDetails/Section/ProductsDetails'
import ServiceOrder from './Component/Admin/servicesOrders'


// Layouts for admin pages onlyyyyyyy////////////////////////////////////////////////////////////////////////////////////
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> }, // shows at "/"
      { path: "BehindStory", element: <BehindStory /> }, 
      { path: "Support", element: <Support /> }, 
      { path: "Offers", element: <Offers /> },
      { path: "Sales/:id", element: <Sales /> }, 
      { path: "Profile", element: <Profile /> }, 
      { path: "Orders", element: <Orders /> }, 
      { path: "Cart", element: <Cart /> }, 
      { path: "ProductsDetails/:id", element: <ProductsDetails /> },
      { path: "ResetPassword", element: <ResetPassword />}
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      // Redirect empty admin path to dashboard
      { path: "", element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "tables", element: <AdminTables /> },
      { path: "Product", element: <Product /> },
      { path: "Categories", element: <Categories /> },
      { path: "OfferTable", element: <OfferTable /> },
      { path: "Meeting", element: <Meeting /> },
      { path: "Review", element: <Review /> },
      { path: "ServiceOrder", element: <ServiceOrder /> },
      // Add more admin routes here as needed
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
