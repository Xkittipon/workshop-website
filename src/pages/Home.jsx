import React from "react";
import ContentCarousel from "../components/home/ContentCarousel";
import Recommend from "../components/home/Recommend";
import NewProduct from "../components/home/NewProduct";
import Contact from "../components/contact";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#ffffff] p-4 mx-auto max-w-7xl">
      <ContentCarousel />

      <div className="my-8">
        <h1 className="text-3xl font-bold ">lorem</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat{" "}
        </p>
      </div>

      <p className="text-center text-2xl my-4">Recommend</p>
      <Recommend />
      {/*<p className="text-center text-2xl my-4">New Products</p>
      <NewProduct />*/}
      <Contact />
    </div>
  );
};

export default Home;
