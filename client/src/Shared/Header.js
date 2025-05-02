import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal';
import Logo from '../Assetes/imgs/Logo.png';
import { useAuth } from '../Context/AuthContext';
import authApi from '../api/authApi';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user, loading, removeAuthToken, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

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

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await authApi.post('auth/logout', {});
    removeAuthToken();
    setIsLoggedIn(false);
    navigate("/")
  };

  const loadCategories = async () => {
    try {
      const res = await authApi.get('/category');
      setCategories(res.data.categories);
    } catch (e) {
      console.error("Failed to load categories", e);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    loadCategories();
    setIsLoggedIn(!!user);
  }, [user, loading]);

  return (
      <header className="white-header">
        <Container>
          <Navbar expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
            <Navbar.Brand as={Link} to="/" className="logo-brand">
              <img src={Logo} alt="Logo" width="100" height="auto" className="logo-img" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />

            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="align-items-center">
                <Nav.Link as={Link} to="/" className="nav-link-white">Home</Nav.Link>
                <Nav.Link as={Link} to="/BehindStory" className="nav-link-white">About</Nav.Link>

                <NavDropdown title="Our Services" id="services-dropdown" className="nav-dropdown-white">
                  {categories.map((category) => (
                      <NavDropdown.Item
                          key={category.id}
                          as={Link}
                          to={`/Services#${category.id}`}
                          className="dropdown-item-white"
                          onClick={() => setExpanded(false)}
                      >
                        {category.name}
                      </NavDropdown.Item>
                  ))}
                </NavDropdown>

                <Nav.Link as={Link} to="/Support" className="nav-link-white">Contact</Nav.Link>

                <div className="social-icons d-flex">
                  <a href="https://www.facebook.com/strategy.stars.ads" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.instagram.com/strategy.stars.ads/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/strategy-stars-ads/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>

                <span className="text-white mx-3">|</span>

                {isLoggedIn ? (
                    <NavDropdown title={<i className="fas fa-user-circle" style={{ color: 'white', fontSize: '30px' }} />} id="profile-dropdown" align="end" className="nav-dropdown-white">
                      <NavDropdown.Item as={Link} to="/profile" className="dropdown-item-white">
                        <i className="fas fa-user me-2"></i> Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/Orders" className="dropdown-item-white">
                        <i className="fas fa-clipboard-list me-2"></i> Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/Cart" className="dropdown-item-white">
                        <i className="fas fa-shopping-cart me-2"></i> Cart
                      </NavDropdown.Item>
                      {isAdmin() && (
                          <NavDropdown.Item as={Link} to="/admin" className="dropdown-item-white">
                            <i className="fas fa-cog me-2" style={{ color: '#917243' }}></i> Admin Dashboard
                          </NavDropdown.Item>
                      )}
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout} className="dropdown-item-white">
                        <i className="fas fa-sign-out-alt me-2" style={{ color: '#917243' }}></i> Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                ) : (
                    <>
                      <Nav.Link onClick={openLogin} className="nav-link-icon Login" title="Login">
                        <i className="fas fa-sign-in-alt" style={{ color: 'white' }}></i>
                      </Nav.Link>
                      <Nav.Link onClick={openSignup} className="nav-link-icon Login" title="Register">
                        <i className="fas fa-user-plus" style={{ color: 'white' }}></i>
                      </Nav.Link>
                    </>
                )}
              </Nav>
            </Navbar.Collapse>

            <LoginModal show={showLogin} onClose={closeModals} onSwitchToSignup={openSignup} />
            <RegisterModal show={showSignup} onClose={closeModals} onSwitchToLogin={openLogin} />
          </Navbar>
        </Container>

        {isVisible && (
            <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
              ↑
            </button>
        )}
      </header>
  );
};

export default Header;
