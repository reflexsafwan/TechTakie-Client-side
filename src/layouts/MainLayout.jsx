import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Container from "../components/Container";
import Footer from "../components/Footer";

const Mainlayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar></Navbar>
      <main className="flex-1">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Mainlayout;
