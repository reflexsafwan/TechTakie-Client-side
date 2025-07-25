import React from "react";
import HomeCarousel from "../../components/HomeCarousel";
import FeaturedProductsSection from "./FeaturedProductsSection";
import ValuePropositionSection from "../../components/Home/ValuePropositionSection";
import TopContributorsSection from "../../components/Home/TopContributorsSection ";

const Home = () => {
  return (
    <>
      <HomeCarousel></HomeCarousel>
      <FeaturedProductsSection></FeaturedProductsSection>
      <ValuePropositionSection></ValuePropositionSection>
      <TopContributorsSection></TopContributorsSection>
    </>
  );
};

export default Home;
