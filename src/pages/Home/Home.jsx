import React from "react";
import HomeCarousel from "../../components/HomeCarousel";
import FeaturedProductsSection from "./FeaturedProductsSection";
import ValuePropositionSection from "../../components/Home/ValuePropositionSection";
import TopContributorsSection from "../../components/Home/TopContributorsSection ";
import TrendingProductsSection from "../../components/Home/TrendingProductsSection";
import CouponCarouselSection from "../../components/Home/CouponCarouselSection";

const Home = () => {
  return (
    <>
      <HomeCarousel></HomeCarousel>
      <FeaturedProductsSection></FeaturedProductsSection>
      <TrendingProductsSection></TrendingProductsSection>
      <CouponCarouselSection></CouponCarouselSection>
      <ValuePropositionSection></ValuePropositionSection>
      <TopContributorsSection></TopContributorsSection>
    </>
  );
};

export default Home;
