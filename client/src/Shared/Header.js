import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal'; 
import Logo from '../Assetes/imgs/Logo.png'

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <header className="white-header">
      <Container>
        <Navbar expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="logo-brand">
            <img 
              src={Logo} 
              alt="Backlink Group" 
              width="150"
              height="auto"
              className="logo-img"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center">

              {/* Pages */}
              <Nav.Link as={Link} to="/" className="nav-link-white">Home</Nav.Link>
              <Nav.Link as={Link} to="/BehindStory" className="nav-link-white">About</Nav.Link>
              
              <NavDropdown 
                title="Services" 
                id="services-dropdown" 
                className="nav-dropdown-white"
              >
                <NavDropdown.Item as={Link} to="/social-media-management" className="dropdown-item-white">
                  Social Media Management
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/google-ads" className="dropdown-item-white">
                  Google Ads
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/media-production" className="dropdown-item-white">
                  Media Production
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/web-design-and-development" className="dropdown-item-white">
                  Web Design & Development
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/public-relations" className="dropdown-item-white">
                  Public Relations
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ooh-marketing" className="dropdown-item-white">
                  OOH Marketing
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/brand-identity" className="dropdown-item-white">
                  Brand Identity
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/contact" className="nav-link-white">Contact</Nav.Link>
              
              {/* Social Icons */}
              <div className="social-icons d-flex">
                <a href="https://www.facebook.com/Backlink.Marketing" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/backlink.marketing" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/backlink-marketing-agency/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.youtube.com/@BacklinkMarketingAgency/videos" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>

              {/* Authentication Section */}
              {isLoggedIn ? (
                <NavDropdown
                  title={<i className="fas fa-user-circle"></i>}
                  id="profile-dropdown"
                  align="end"
                  className="profile-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/profile" className="dropdown-item-white">
                    <i className="fas fa-user me-2"></i> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings" className="dropdown-item-white">
                    <i className="fas fa-cog me-2"></i> Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => setIsLoggedIn(false)} className="dropdown-item-white">
                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link onClick={openLogin} className="nav-link-icon Login" title="Login">
                    <i className="fas fa-sign-in-alt"></i>
                  </Nav.Link>
                  <Nav.Link onClick={openSignup} className="nav-link-icon Login" title="Register">
                    <i className="fas fa-user-plus"></i>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>

          {/* Modals Rendered outside Nav */}
          <LoginModal 
            show={showLogin} 
            onClose={closeModals} 
            onSwitchToSignup={openSignup}
          />
          <RegisterModal 
            show={showSignup} 
            onClose={closeModals} 
            onSwitchToLogin={openLogin}
          />

        </Navbar>
      </Container>
    </header>
  );
};
// 2025

export default Header;
