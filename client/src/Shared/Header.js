import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginModal from '../Auth/Login';
import SignupModal from '../Auth/Register';
import { useLoginModal } from '../Hook/useLoginModal';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your actual auth state

  const { showLoginModal, openLoginModal, closeLoginModal } = useLoginModal();
  const [showSignup, setShowSignup] = useState(false);

  return (
    <header className="white-header">
      <Container>
        <Navbar expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="logo-brand">
            <img 
              src="https://backlink-group.com/wp-content/uploads/2024/05/ai_3-01-removebg-preview-e1714950330613.webp" 
              alt="Backlink Group" 
              width="240"
              height="auto"
              className="logo-img"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            {/* Main Navigation */}
            <Nav className="align-items-center">
              <Nav.Link as={Link} to="/" className="nav-link-white">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-link-white">About</Nav.Link>
              
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

              {/* Auth Section */}
              {isLoggedIn ? (
                <NavDropdown
                  title={
                    <span className="d-inline-flex align-items-center">
                      <i className="fas fa-user-circle me-1"></i>
                    </span>
                  }
                  id="profile-dropdown"
                  align="end"
                  className="profile-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/profile" className="dropdown-item-white">
                    <i className="fas fa-user me-2 Login"></i> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings" className="dropdown-item-white">
                    <i className="fas fa-cog me-2 Login"></i> Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item 
                    onClick={() => setIsLoggedIn(false)} 
                    className="dropdown-item-white"
                  >
                    <i className="fas fa-sign-out-alt me-2 Login"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/Login" className="nav-link-icon Login" title="Login"  onClick={openLoginModal}>
                    <i className="fas fa-sign-in-alt"></i>
                  </Nav.Link>
                  <LoginModal show={showLoginModal} handleClose={closeLoginModal} />
                  <Nav.Link as={Link} to="/register" className="nav-link-icon Login" title="Register" onClick={() => setShowSignup(true)}>
                    <i className="fas fa-user-plus"></i>
                  </Nav.Link>
                  <SignupModal show={showSignup} handleClose={() => setShowSignup(false)} />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;