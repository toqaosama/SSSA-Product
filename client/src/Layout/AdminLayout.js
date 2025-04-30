import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import Sidebar from '../Component/Admin/Sidebar';
import './AdminLayout.css';
import {useAuth} from "../Context/AuthContext";

const AdminLayout = () => {
    const {isAuthenticated, isAdmin} = useAuth();

    if(!isAuthenticated() || !isAdmin()) {
        return <Navigate to="/" />;
    }
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;