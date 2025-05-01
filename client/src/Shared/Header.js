import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal'; 
import Logo from '../Assetes/imgs/Logo.png'
import { FaArrowUp } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import authApi from '../api/authApi';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const {user, loading, removeAuthToken, isAdmin} = useAuth(); 

  const navigate = useNavigate();

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

  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLogout = async () => {
    await authApi.post('auth/logout', {});
    removeAuthToken();
    setIsLoggedIn(false);
    navigate("/")
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }
  , [user, loading]);

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
                title="Our Services" 
                id="services-dropdown" 
                className="nav-dropdown-white"
              >
                <NavDropdown.Item as={Link} to="/Categores" className="dropdown-item-white">
                Electronics
                </NavDropdown.Item>
            
              </NavDropdown>

              <Nav.Link as={Link} to="/Support" className="nav-link-white">Contact</Nav.Link>
              
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
              <span className="text-white mx-3">
                |
              </span>
              {/* Authentication Section */}
              {isLoggedIn ? (
                <NavDropdown 
                title={<i style={{ color: 'white', fontSize: '30px' }} className="fas fa-user-circle "></i>}
                  id="profile-dropdown"
                  align="end"
                  className="nav-dropdown-white"
                  style={{color:'#917243'}}
                 
                >
                  <NavDropdown.Item as={Link} to="/profile" className="dropdown-item-white">
                    <i className="fas fa-user me-2"></i> Profile
                  </NavDropdown.Item>
                  {isAdmin() && <NavDropdown.Item as={Link} to="/admin" className="dropdown-item-white">
                    <i style={{color:'#917243'}} className="fas fa-cog me-2"></i> Admin Dashboard
                  </NavDropdown.Item>
                  }
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="dropdown-item-white">
                    <i style={{color:'#917243'}} className="fas fa-sign-out-alt me-2"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link onClick={openLogin} className="nav-link-icon Login" title="Login">
                    <i style={{color:'white'}}  className="fas fa-sign-in-alt"></i>
                  </Nav.Link>
                  <Nav.Link onClick={openSignup} className="nav-link-icon Login" title="Register">
                    <i style={{color:'white'}}className="fas fa-user-plus"></i>
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
      <div>
        {/* Scroll to Top Button */}
              {isVisible && (
                <button 
                  onClick={scrollToTop}
                  className="scroll-to-top"
                  aria-label="Scroll to top"
                >
                  <FaArrowUp />
                </button>
              )}
      </div>
    </header>

    
  );
};
// 2025

export default Header;
