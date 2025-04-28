import { createBrowserRouter, Navigate } from "react-router-dom";
import App from './App';
import Home from "./Home/Home";
import NotFound from "./Shared/Error";
import Register from "./Auth/RegisterModal";
import BehindStory from "./Component/AboutUs/Section/BehindStory";
import Support from "./Component/Support/Section/Support";
import Categores from "./Component/Categores/Categores";






// Layouts
import AdminLayout from "./Layout/AdminLayout";
import AdminDashboard from "./Component/Admin/AdminDashboard";
import AdminTables from "./Component/Admin/UserMangement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> }, // shows at "/"
      { path: "BehindStory", element: <BehindStory /> }, 
      { path: "Support", element: <Support /> }, 
      // { path: "Tables", element: <Tables /> }, 
      { path: "Categores", element: <Categores /> }, 
   
   
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
      // Add more admin routes here as needed
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
