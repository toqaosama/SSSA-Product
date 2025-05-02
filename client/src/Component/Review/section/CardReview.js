import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Border } from 'react-bootstrap-icons';

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
      width: "400px",
      
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