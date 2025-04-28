import React, { Component } from 'react'
import AboutCard from './CardContainer '
import AutoRotatingCards from './AutoRotatingCards'
import Split from './Section/SplitBar'
import ServesCard from './ServesCard'


const Home = () => {
  
    return (
      <div>
       <AutoRotatingCards />
       <Split />
      
       <ServesCard />
      </div>
    );
  
};

export default Home;


