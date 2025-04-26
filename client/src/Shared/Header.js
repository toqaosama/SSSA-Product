

import React, { useState } from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/Header.css'; // We'll create this for custom styles

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <header className="white-header">
      <Container>
        <Navbar expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
          {/* Logo */}
          <Navbar.Brand href="https://backlink-group.com/" className="logo-brand">
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
              <Nav.Link href="https://backlink-group.com/" className="nav-link-white">Home</Nav.Link>
              <Nav.Link href="https://backlink-group.com/about/" className="nav-link-white">About</Nav.Link>
              
              {/* Services Dropdown */}
              <NavDropdown 
                title="Services" 
                id="services-dropdown" 
                className="nav-dropdown-white"
              >
                <NavDropdown.Item href="https://backlink-group.com/social-media-management/" className="dropdown-item-white">
                  Social Media Management
                </NavDropdown.Item>
                <NavDropdown.Item href="https://backlink-group.com/google-ads/" className="dropdown-item-white">
                  Google Ads
                </NavDropdown.Item>
                <NavDropdown.Item href="https://backlink-group.com/media-production/" className="dropdown-item-white">
                  Media Production
                </NavDropdown.Item>
                <NavDropdown.Item href="https://backlink-group.com/web-design-and-development/" className="dropdown-item-white">
                  Web Design & Development
                </NavDropdown.Item>
                <NavDropdown.Item href="https://backlink-group.com/public-relations/" className="dropdown-item-white">
                  Public Relations
                </NavDropdown.Item>
                <NavDropdown.Item href="https://backlink-group.com/ooh-marketing/" className="dropdown-item-white">
                  OOH Marketing
                </NavDropdown.Item>
                <NavDropdown.Item href="https://backlink-group.com/brand-identity/" className="dropdown-item-white">
                  Brand Identity
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="https://backlink-group.com/contact/" className="nav-link-white">Contact</Nav.Link>
              
              {/* Company Profile Button */}
              {/* <Button 
                href="https://backlink-group.com/wp-content/uploads/2024/06/Backlink-C-Profile-EN.pdf" 
                className="profile-btn ml-lg-3"
              >
                Our Company Profile
              </Button> */}
              
              {/* Language Selector
              <NavDropdown 
                title={
                  <>
                    <img 
                      src="https://backlink-group.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png" 
                      alt="English" 
                      width="20"
                      className="flag-img"
                    /> En
                  </>
                } 
                id="language-dropdown" 
                className="language-dropdown"
              >
                <NavDropdown.Item href="https://backlink-group.com/?lang=ar">
                  <img 
                    src="https://backlink-group.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/ar.png" 
                    alt="Arabic" 
                    width="20"
                    className="flag-img"
                  /> Ar
                </NavDropdown.Item>
              </NavDropdown> */}
              
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
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;