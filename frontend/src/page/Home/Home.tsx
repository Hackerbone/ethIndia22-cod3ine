import { Image } from "antd";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-homePageContainer">
        <div className="home-heroSection">
          <div className="home-homePageContainer-left">
            <div className="home-homePageContainer-left-title">
              Collaborating with your Team Made Easier.
            </div>
            <div className="home-homePageContainer-left-subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              eget libero fringilla arcu aliquam commodo. Ut consectetur dapibus
              dolor.
            </div>
          </div>
          <div className="home-homePageContainer-right">
            <Image
              preview={false}
              src="/images/hero.svg"
              className="home-heroimg"
            />
          </div>
        </div>

        <div className="home-featuresSection">
          <h1 className="home-featuresTitle">
            Store and Share Encrypted Files with your team seamlessly on
            decentralized network.
          </h1>
          <Image
            preview={false}
            src="/images/network.svg"
            className="home-feature-network-img"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
