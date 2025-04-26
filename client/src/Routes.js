import { createBrowserRouter, Navigate } from "react-router-dom";
import App from './App';
import Home from "./Home/Home";
import NotFound from "./Shared/Error";

// Layouts
import AdminLayout from "./Layout/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> }, // shows at "/"
   
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
