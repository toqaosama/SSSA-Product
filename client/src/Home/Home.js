import React, { Component } from 'react'
import AboutCard from './CardContainer '
import AutoRotatingCards from './AutoRotatingCards'
import Split from './Sections/Split'

const Home = () => {
  
    return (
      <div>
       <AutoRotatingCards />
       <Split />
       <AboutCard />
      </div>
    );
  
};

export default Home;


