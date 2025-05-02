import React, { Component, useEffect } from 'react'
import AboutCard from './CardContainer '
import AutoRotatingCards from './AutoRotatingCards'
import Split from './Section/SplitBar'
import ServesCard from './ServesCard'
import SupportSection from './Section/SupportSection'
import Review from '../Component/Review/section/Review'
import Offers from '../Component/Offers/Section/Offers'
import OfferContact from '../Component/Offers/Section/OfferContact'

const Home = () => {
    return (
      <div>
       <AutoRotatingCards />
       <Split />
       <SupportSection />
       <ServesCard />
       <Offers />
       <OfferContact />
      </div>
    );
  
};

export default Home;


