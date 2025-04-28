import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const BehindStory = () => {
  // Styles object for consistent styling
  const styles = {
    heroSection: {
      minHeight: "80vh",
      display: "flex",
      backgroundColor: "#ECECEC",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color:'#917243',
    },
    section: {
      minHeight: "70vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "2rem 0"
    },
    logoSection: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "#ECECEC"
    },
    imageTextSection: {
      minHeight: "70vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    growthSection: {
      minHeight: "70vh",
      backgroundColor: "#ECECEC",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    youtubeIcon: {
      width: "60px",
      height: "60px",
      backgroundColor: "#917243",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: "24px",
      textDecoration: "none"
    },
    textGradient: {
      // background: "linear-gradient(to right, #6a11cb, #2575fc)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "#917243"
    },
    highlightText: {
      color: "#917243",
      fontWeight: "bold"
    },
    testimonialCard: {
      background: "#917243",
      padding: "30px",
      margin: "0 15px",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      width: "400px"
    }
  };

  // Testimonial data for the carousel
  const testimonials = [
    {
      id: 1,
      quote: "HappyAddons has transformed our workflow. The widgets are incredibly powerful and easy to use.",
      author: "Sarah Johnson",
      role: "Web Designer"
    },
    {
      id: 2,
      quote: "The support team is exceptional. They helped us implement complex designs with ease.",
      author: "Michael Chen",
      role: "Frontend Developer"
    },
    {
      id: 3,
      quote: "Best Elementor addons available. The variable width features have been game-changing for our projects.",
      author: "Emma Rodriguez",
      role: "Creative Director"
    },
    {
      id: 4,
      quote: "We've reduced development time by 40% since switching to HappyAddons. Highly recommended!",
      author: "David Wilson",
      role: "Agency Owner"
    }
  ];

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          variableWidth: false,
          centerMode: false
        }
      }
    ]
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <Container>
          <h5 style={{fontWeight:'bolder'}}>About Us</h5>
          <h1 style={{fontWeight:'bolder'}}>Behind Story</h1>
        </Container>
      </div>

      {/* History Section */}
      <div style={styles.section}>
        <div>
          <h2 style={{ ...styles.textGradient, fontWeight: 'bold', textAlign: 'center' ,color:'#917243'}}>The History Of</h2>
          <h2><span style={{ fontWeight: 'bold',color:'#231f20' }}>HappyAddons</span></h2>
          <p style={{ maxWidth: '700px', margin: '0 auto' }}>
            HappyAddons started its journey in 2019 with a vision of making web development easier. <br />
            And it is doing so from the very beginning by empowering the Elementor Page Builder.
            Let's get to know the history of HappyAddons below.
          </p>
        </div>
      </div>

      {/* Logo Section */}
      <div style={styles.logoSection}>
        <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          <img 
            src='https://happyaddons.com/wp-content/uploads/2022/10/happy-monster-logo.svg' 
            width="350" 
            alt="Happy Monster Logo"
            style={{ padding: '2rem' }}
          />
          <img 
            src='https://happyaddons.com/wp-content/uploads/2022/10/weDevs-full-logo.png' 
            width="350" 
            alt="weDevs Logo"
            style={{ padding: '2rem' }}
          />
        </Container>
      </div>

      {/* Imagination Section */}
      <div style={styles.imageTextSection}>
        <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
          <img 
            src='https://happyaddons.com/wp-content/uploads/2022/10/behindstory-imagine.svg' 
            width="350" 
            alt="Bringing Imagination to Reality"
            style={{ padding: '1rem' }}
          />
          <div style={{ maxWidth: '500px' }}>
            <h2>Bringing Imagination into Reality</h2>
            <p>
              Bringing a unique set of Widgets and Problem-solving features for Elementor users 
              has always been the aim of <span style={styles.highlightText}>weDevs</span> and <span style={styles.highlightText}>HappyMonster</span>.
            </p>
          </div>
        </Container>
      </div>

      {/* Story Section */}
      <div style={{ padding: '3rem 0' }}>
        <Container style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p>
            Our origin story is interesting. The HappyAddons project is the brainchild of the team HappyMonster – 
            a super-talented group of engineers, thinkers, and artists. Their work was primarily based on developing 
            page builders and providing customer support for web development.
          </p>
          <br />
          <p>
            As the market for Elementor was semi-saturated, they created their niche with their experience in 
            Engineering, R&D, and Design sectors.
          </p>
          <br />
          <p>
            But only developing is not enough to grow a business; marketing and technical support also play a vital role. 
            Since weDevs is experienced in marketing and giving technical support on a massive scale, Team HappyMonster 
            partnered with weDevs before launching the premium version of HappyAddons.
          </p>
        </Container>
      </div>

      {/* Growth Section */}
      <div style={styles.growthSection}>
        <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
          <div style={{ maxWidth: '500px', textAlign: 'left' }}>
            <h1 style={{color:'#917243'}}>HappyAddons Keeps <br /> Growing</h1>
            <p>
              We are the pioneer of creating features like Cross-Domain Copy paste, design presets, unlimited nested sections, 
              image masking, live copying facility from our demo website to anyone's site, floating effects, CSS transforms, 
              Text Stroke, line icons, and more.
            </p>
          </div>
          <div>
            <a 
              href="https://www.youtube.com/@BacklinkMarketingAgency/videos" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.youtubeIcon}
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </Container>
      </div>

      {/* Users Love Us Section */}
      <div style={styles.section}>
        <Container style={{ maxWidth: '1200px' }}>
          <h1 style={{ fontWeight: 'lighter', color: '#917243', fontSize: '2.5rem' }}>Why Our Users</h1>
          <h1 style={{ fontWeight: 'bold', color: '#917243', fontSize: '2.5rem' }}> Love Us</h1>
          <p style={{ marginBottom: '3rem' }}>
            300k+ users are now actively using HappyAddons. Check our users' reviews to see how much they love us.
          </p>
          
          {/* Testimonial Carousel */}
          <Slider {...carouselSettings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} style={styles.testimonialCard}>
                <blockquote style={{ fontStyle: 'italic', marginBottom: '20px' }}>
                  "{testimonial.quote}"
                </blockquote>
                <div style={{ fontWeight: 'bold' }}>{testimonial.author}</div>
                <div style={{ color: '#917243' }}>{testimonial.role}</div>
              </div>
            ))}
          </Slider>
        </Container>
      </div>
    </div>
  );
};

export default BehindStory;