import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FiGrid, FiUsers, FiBarChart2, FiBell, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react'; // or use an inline SVG if needed
import './AdminSetting/Style/Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h1>Admin</h1>
        <button className="collapse-btn" onClick={toggleSidebar}>
          <ChevronLeft className={`chevron-icon ${collapsed ? 'rotated' : ''}`} />
        </button>
      </div>

      <Nav className="flex-column">
      <Nav.Link  as={Link} to="/admin/dashboard" className="nav-link dash">
          <FiGrid className="nav-icon" />
          <span>Dashboard</span>
          </Nav.Link>
          <Nav.Link  as={Link} to="/Admin/startcard" className="nav-link dash">
          <FiSettings className="nav-icon" />
          <span>StartCard</span>
          </Nav.Link>
          <Nav.Link  as={Link} to="/admin/dashboard" className="nav-link dash">
          <FiUsers className="nav-icon" />
          <span>Users</span>
        </Nav.Link>
        <Nav.Link  as={Link} to="/admin/dashboard" className="nav-link dash">
          <FiBarChart2 className="nav-icon" />
          <span>Analytics</span>
        </Nav.Link>
        <Nav.Link  as={Link} to="/admin/dashboard" className="nav-link dash">
          <FiBell className="nav-icon" />
          <span>Notifications</span>
        </Nav.Link>
        <Nav.Link  as={Link} to="/admin/dashboard" className="nav-link dash">
          <FiSettings className="nav-icon" />
          <span>Settings</span>
        </Nav.Link>
        <Nav.Link  as={Link} to="/Admin/ProductManage" className="nav-link dash">
          <FiSettings className="nav-icon" />
          <span>product</span>
        </Nav.Link>
      </Nav>
    </nav>
  );
};

export default Sidebar;
