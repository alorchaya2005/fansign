import React from "react";
import Reveal from "../utils/Reveal";
import LoginPage from "./LoginPage";
import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import BestMatch from "../components/home/BestMatch";
import Categories from "../components/home/Categories";
import AddOns from "../components/home/AddOns";
import Vouch from "../components/home/Vouch";
import About from "../components/home/About";

function HomePage() {
  return (
    <Layout>
      <div className="bg-[linear-gradient(to_right,#4d4d4d20_1px,transparent_1px),linear-gradient(to_bottom,#4d4d4d20_1px,transparent_1px)] bg-[size:30px_30px]">
        <Hero />
        <BestMatch />
        <About />
        {/* <Categories /> */}
        {/* <AddOns /> */}
        <Vouch />
      </div>
    </Layout>
  );
}

export default HomePage;
