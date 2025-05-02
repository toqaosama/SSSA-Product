import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import '../Style/BehindStory.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const BehindStory = () => {
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
    <div className="behind-story-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <h5 className="hero-subtitle">About Us</h5>
          <h1 className="hero-title">Behind Story</h1>
        </Container>
      </section>

      {/* History Section */}
      <section className="section">
        <div className="content-wrapper">
          <p className="history-text">
            SSA is a full-service marketing agency, specializing in digital marketing, branding, packaging, printing, 
            designs, strategy, content and communication, social media, advertising, media buying, events, promotions, 
            Production, Billboards, Outdoors and Square Zone. We provide each of our customers a custom marketing campaign, 
            tailored to their specific marketing needs.
            <br /><br />
            Our highly skilled and experienced marketing professionals help businesses achieve consistent and sustainable growth. 
            Our clients are our number one priority, which reflects with our phenomenal customer retention rate.
          </p>
        </div>
      </section>

      {/* Imagination Section */}
      <section className="image-text-section change">
        <Container className="flex-container">
          <img 
            src='https://happyaddons.com/wp-content/uploads/2022/10/behindstory-imagine.svg' 
            width="350" 
            alt="Our Mission"
            className="mission-image"
          />
          <div className="text-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              To provide personalized marketing strategies that help brands engage their
              <span className="highlight-text"> audiences </span> and <span className="highlight-text">achieve measurable growth</span>.
            </p>
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="story-section change">
        <Container className="flex-container ">
          <div className="text-content">
            <h2 className="section-title">Our Vision</h2>
            <p className="section-text">
              To be the leading marketing agency in the region, and to provide proven and effective 
              marketing services to ensure your company remains competitive now and in the future.
            </p>
          </div>
          <img 
            src='https://happyaddons.com/wp-content/uploads/2022/10/behindstory-imagine.svg' 
            width="350" 
            alt="Our Mission"
            className="mission-image"
          />
        </Container>
      </section>

      {/* Growth Section
      <section className="growth-section">
        <Container className="flex-container">
          <div className="text-content">
            <h1 className="growth-title">HappyAddons Keeps <br /> Growing</h1>
            <p className="section-text">
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
              className="youtube-icon"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </Container>
      </section> */}

      {/* Users Love Us Section */}
      <section className="section">
        <Container className="wide-container">
          <h1 className="section-title light">Why Our Users</h1>
          <h1 className="section-title bold"> Love Us</h1>
          <p className="section-intro">
            300k+ users are now actively using HappyAddons. Check our users' reviews to see how much they love us.
          </p>
          
          {/* Testimonial Carousel */}
          <Slider {...carouselSettings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <blockquote className="testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>
                <div className="testimonial-author">{testimonial.author}</div>
                <div className="testimonial-role">{testimonial.role}</div>
              </div>
            ))}
          </Slider>
        </Container>
      </section>
    </div>
  );
};

export default BehindStory;