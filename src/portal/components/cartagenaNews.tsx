import React from "react";
import { Button } from "@public/components/ui/button";

const CartagenaNews = () => {
  return (
    <div className="overlayed-pic container-fluid p-3 text-light p-relative">
      <div className="overlay">
        <div className="container col-lg-8 col-md-8 col-12 mb-4 py-5 mb-md-0 m-auto text-center text-white">
          <h2 className="fs-1 fw-bold">CARTAGENA NEWSLETTER</h2>
          <p className="fs-5 my-3">
            Get the latest discounts, deals, coupons, news, & tips of Cartagena.
          </p>
          <div className="flex max-w-2xl mx-auto bg-white rounded-md overflow-hidden p-1">
            <input
              className="flex-grow p-2 text-black outline-none"
              type="email"
              placeholder="Enter Your Email"
            />
            <Button className="text-white my-auto px-6 py-2 font-bold bg-[#d0a439] hover:bg-[#b88f30] transition-colors">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartagenaNews;
