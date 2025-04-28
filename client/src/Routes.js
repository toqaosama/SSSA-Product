import { createBrowserRouter, Navigate } from "react-router-dom";
import App from './App';
import Home from "./Home/Home";
import NotFound from "./Shared/Error";
import Register from "./Auth/RegisterModal";
import BehindStory from "./Component/AboutUs/Section/BehindStory";
import Support from "./Component/Support/Section/Support";
import Categores from "./Component/Categores/Categores";
import Offers from "./Component/Offers/Section/Offers";




// Layouts
import AdminLayout from "./Layout/AdminLayout";
import Tables from "./Component/Admin/Tables";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> }, // shows at "/"
      { path: "BehindStory", element: <BehindStory /> }, 
      { path: "Support", element: <Support /> }, 
      { path: "Tables", element: <Tables /> }, 
      { path: "Categores", element: <Categores /> }, 
      { path: "Offers", element: <Offers /> }, 
   
   
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Navigate to="Home" replace /> }, // redirect "/admin" → "/admin/dashboard"

      
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
