import React, { Component, useEffect } from 'react'
import AboutCard from './CardContainer '
import AutoRotatingCards from './AutoRotatingCards'
import Split from './Section/SplitBar'
import ServesCard from './ServesCard'
import SupportSection from './Section/SupportSection'
import Review from '../Component/Review/section/Review'
import Offers from '../Component/Offers/Section/Offers'
import OfferContact from '../Component/Offers/Section/OfferContact'
import Services from "../Component/Categores/Services";

const Home = () => {
    return (
      <div>
       <AutoRotatingCards />
       <Split />
       <SupportSection />
        <ServesCard max={3} />
       <Offers />
       <OfferContact />
      </div>
    );
  
};

export default Home;


