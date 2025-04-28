import React, { Component } from 'react'
import AboutCard from './CardContainer '
import AutoRotatingCards from './AutoRotatingCards'
import Split from './Section/SplitBar'
import ServesCard from './ServesCard'
import SupportSection from './Section/SupportSection'


const Home = () => {
  
    return (
      <div>
       <AutoRotatingCards />
       <Split />
       <SupportSection />
      
       <ServesCard />
      </div>
    );
  
};

export default Home;


