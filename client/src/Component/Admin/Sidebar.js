import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import {FiGrid, FiUsers, FiBarChart2, FiBell, FiSettings, FiHome} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react'; // or use an inline SVG if needed
import './AdminSetting/Style/Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h1>Admin Dashboard</h1>
        <button className="collapse-btn" onClick={toggleSidebar}>
          <ChevronLeft className={`chevron-icon ${collapsed ? 'rotated' : ''}`} />
        </button>
      </div>

      <Nav className="flex-column">
      <Nav.Link  as={Link} to="/admin/dashboard" className="nav-link dash">
          <FiGrid className="nav-icon" />
          <span>Dashboard</span>
          </Nav.Link>
          <Nav.Link  as={Link} to="/admin/Product" className="nav-link dash">
          <FiSettings className="nav-icon" />
          <span>Product Manage</span>
          </Nav.Link>
          <Nav.Link  as={Link} to="/admin/tables" className="nav-link dash">
          <FiUsers className="nav-icon" />
          <span>Users Manage</span>
        </Nav.Link>
        <Nav.Link  as={Link} to="/admin/Categories" className="nav-link dash">
          <FiBarChart2 className="nav-icon" />
          <span>Categores Manage</span>
        </Nav.Link>
        <Nav.Link  as={Link} to="/admin/OfferTable" className="nav-link dash">
          <FiBell className="nav-icon" />
          <span>Offer Manage</span>
        </Nav.Link>
        <Nav.Link  as={Link} to="/admin/Meeting" className="nav-link dash">
          <FiSettings className="nav-icon" />
          <span>Meeting Schedule</span>
        </Nav.Link>
        <Nav.Link  as={Link} to="/admin/Review" className="nav-link dash">
          <FiSettings className="nav-icon" />
          <span>Reviews Manage</span>
        </Nav.Link>
          <Nav.Link  as={Link} to="/" className="nav-link dash">
              <FiHome className="nav-icon" />
              <span>Back To Home Page</span>
          </Nav.Link>
      </Nav>
    </nav>
  );
};

export default Sidebar;
