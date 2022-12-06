import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <>
      <div style={{ backgroundColor: "#EFC81A" }}>
        <div className="container py-5">
          <h1 className="d-flex justify-content-md-center">
            Eat, Cook, Repeat
          </h1>
          <p className="d-flex justify-content-md-center">
            Share Your Best Recipe By Uploading Here!
          </p>
          <div className="d-flex justify-content-around py-5">
            <div className="d-flex justify-content-evenly ">
              <Link href="" className="mx-3">
                Product
              </Link>
              <Link href="" className="mx-3">
                Company
              </Link>
              <Link href="" className="mx-3">
                Learn More
              </Link>
              <Link href="" className="mx-3">
                Get In Touch
              </Link>
            </div>

            <div>Flex item</div>
          </div>
        </div>
      </div>
    </>
  );
};
