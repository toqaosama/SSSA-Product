import React, { Component } from 'react'
import AboutCard from './CardContainer '
import AutoRotatingCards from './AutoRotatingCards'
import Split from './Section/SplitBar'
import ServesCard from './ServesCard'
import SupportSection from './Section/SupportSection'
import Review from '../Component/Review/section/Review'


const Home = () => {
  
    return (
      <div>
       <AutoRotatingCards />
       <Split />
       <SupportSection />
       <ServesCard />
       <Review />
      </div>
    );
  
};

export default Home;


